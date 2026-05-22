import type { ComponentType } from "react";
import type { Question } from "@/domain/question";
import { MultipleChoiceField } from "./MultipleChoiceField";
import { OpenQuestionField } from "./OpenQuestionField";
import type { QuestionFieldProps } from "./QuestionFieldProps";
import { SingleChoiceField } from "./SingleChoiceField";

const fieldByType: Record<Question["type"], ComponentType<QuestionFieldProps>> = {
  open: OpenQuestionField,
  single: SingleChoiceField,
  multiple: MultipleChoiceField,
};

export function QuestionRenderer(props: QuestionFieldProps) {
  const Component = fieldByType[props.question.type];
  return <Component {...props} />;
}
