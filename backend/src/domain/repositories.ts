import type { AnswersMap, StoredAnswer, Survey } from "./question.js";

export interface IQuestionRepository {
  getSurvey(): Promise<Survey>;
}

export interface IAnswerRepository {
  save(answer: StoredAnswer): Promise<void>;
}

export interface IAnswerIndexGenerator {
  nextId(): Promise<string>;
}

export interface SubmitAnswersInput {
  answers: AnswersMap;
}

export interface SubmitAnswersResult {
  id: string;
  message: string;
}
