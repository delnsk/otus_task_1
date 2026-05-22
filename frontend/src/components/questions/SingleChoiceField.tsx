import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { QuestionFieldProps } from "./QuestionFieldProps";

export function SingleChoiceField({
  question,
  value,
  onChange,
}: QuestionFieldProps) {
  const selected = typeof value === "string" ? value : "";

  return (
    <div className="space-y-4">
      <p className="font-display text-lg font-semibold leading-snug text-foreground">
        {question.text}
      </p>
      <RadioGroup
        value={selected}
        onValueChange={onChange}
        className="grid gap-2.5"
      >
        {(question.options ?? []).map((option) => {
          const isSelected = selected === option.id;
          return (
            <label
              key={option.id}
              htmlFor={`${question.id}-${option.id}`}
              className="option-card"
              data-selected={isSelected}
            >
              <RadioGroupItem
                value={option.id}
                id={`${question.id}-${option.id}`}
                className="sr-only"
              />
              <span className="option-indicator" aria-hidden />
              <span className="text-sm font-medium leading-snug">
                {option.label}
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
