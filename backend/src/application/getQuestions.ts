import type { Survey } from "../domain/question.js";
import type { IQuestionRepository } from "../domain/repositories.js";

export class GetQuestionsUseCase {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  async execute(): Promise<Survey> {
    return this.questionRepository.getSurvey();
  }
}
