import { GetQuestionsUseCase } from "./application/getQuestions.js";
import { SubmitAnswerUseCase } from "./application/submitAnswer.js";
import { JsonAnswerRepository } from "./infrastructure/jsonAnswerRepository.js";
import { JsonQuestionRepository } from "./infrastructure/jsonQuestionRepository.js";
import { SequentialIndexGenerator } from "./infrastructure/sequentialIndexGenerator.js";
import { AnswersController } from "./presentation/answersController.js";
import { QuestionsController } from "./presentation/questionsController.js";

export function createCompositionRoot() {
  const questionRepository = new JsonQuestionRepository();
  const answerRepository = new JsonAnswerRepository();
  const indexGenerator = new SequentialIndexGenerator();

  const getQuestionsUseCase = new GetQuestionsUseCase(questionRepository);
  const submitAnswerUseCase = new SubmitAnswerUseCase(
    questionRepository,
    answerRepository,
    indexGenerator,
  );

  const questionsController = new QuestionsController(getQuestionsUseCase);
  const answersController = new AnswersController(submitAnswerUseCase);

  return { questionsController, answersController };
}
