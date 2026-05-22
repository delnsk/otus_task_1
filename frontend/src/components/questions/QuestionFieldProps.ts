import type { Question } from "@/domain/question";

export interface QuestionFieldProps {
  question: Question;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
}
