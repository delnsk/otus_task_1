import type { AnswersMap, SubmitResult, Survey } from "./question";

export interface SurveyApi {
  getQuestions(): Promise<Survey>;
  submitAnswers(answers: AnswersMap): Promise<SubmitResult>;
}
