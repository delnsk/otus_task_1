export type QuestionType = "open" | "single" | "multiple";

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: QuestionOption[];
}

export interface Survey {
  title: string;
  questions: Question[];
}

export type AnswerValue = string | string[];

export type AnswersMap = Record<string, AnswerValue>;

export interface SubmitResult {
  id: string;
  message: string;
}
