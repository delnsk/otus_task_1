import { Textarea } from "@/components/ui/textarea";
import type { QuestionFieldProps } from "./QuestionFieldProps";

export function OpenQuestionField({
  question,
  value,
  onChange,
}: QuestionFieldProps) {
  const textValue = typeof value === "string" ? value : "";

  return (
    <div className="space-y-4">
      <label
        htmlFor={question.id}
        className="font-display block text-lg font-semibold leading-snug text-foreground"
      >
        {question.text}
      </label>
      <Textarea
        id={question.id}
        value={textValue}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Поделитесь своими мыслями..."
        className="text-base"
      />
    </div>
  );
}
