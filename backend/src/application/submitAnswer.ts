import { ValidationError } from "../domain/errors.js";
import type {
  AnswerValue,
  AnswersMap,
  Question,
  Survey,
} from "../domain/question.js";
import type {
  IAnswerIndexGenerator,
  IAnswerRepository,
  IQuestionRepository,
  SubmitAnswersInput,
  SubmitAnswersResult,
} from "../domain/repositories.js";

export class SubmitAnswerUseCase {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly answerRepository: IAnswerRepository,
    private readonly indexGenerator: IAnswerIndexGenerator,
  ) {}

  async execute(input: SubmitAnswersInput): Promise<SubmitAnswersResult> {
    const survey = await this.questionRepository.getSurvey();
    this.validateAnswers(survey, input.answers);

    const id = await this.indexGenerator.nextId();

    await this.answerRepository.save({
      id,
      submittedAt: new Date().toISOString(),
      surveyTitle: survey.title,
      questions: survey.questions,
      answers: input.answers,
    });

    return { id, message: "Спасибо!" };
  }

  private validateAnswers(survey: Survey, answers: AnswersMap): void {
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      throw new ValidationError("Поле answers должно быть объектом");
    }

    const questionMap = new Map(
      survey.questions.map((question) => [question.id, question]),
    );

    for (const key of Object.keys(answers)) {
      if (!questionMap.has(key)) {
        throw new ValidationError(`Неизвестный вопрос: ${key}`);
      }
    }

    for (const question of survey.questions) {
      const value = answers[question.id];
      this.validateQuestionAnswer(question, value);
    }
  }

  private validateQuestionAnswer(
    question: Question,
    value: AnswerValue | undefined,
  ): void {
    const isEmpty =
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    if (question.required && isEmpty) {
      throw new ValidationError(
        `Обязательный вопрос не заполнен: ${question.id}`,
      );
    }

    if (isEmpty) {
      return;
    }

    switch (question.type) {
      case "open":
        if (typeof value !== "string" || value.trim() === "") {
          throw new ValidationError(
            `Вопрос ${question.id}: ожидается непустая строка`,
          );
        }
        break;

      case "single": {
        if (typeof value !== "string") {
          throw new ValidationError(
            `Вопрос ${question.id}: ожидается один вариант ответа`,
          );
        }
        const optionIds = new Set(
          (question.options ?? []).map((option) => option.id),
        );
        if (!optionIds.has(value)) {
          throw new ValidationError(
            `Вопрос ${question.id}: недопустимый вариант ответа`,
          );
        }
        break;
      }

      case "multiple": {
        if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
          throw new ValidationError(
            `Вопрос ${question.id}: ожидается массив вариантов`,
          );
        }
        const optionIds = new Set(
          (question.options ?? []).map((option) => option.id),
        );
        for (const selected of value) {
          if (!optionIds.has(selected)) {
            throw new ValidationError(
              `Вопрос ${question.id}: недопустимый вариант ${selected}`,
            );
          }
        }
        break;
      }
    }
  }
}
