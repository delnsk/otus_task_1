import { Checkbox } from "@/components/ui/checkbox";
import type { QuestionFieldProps } from "./QuestionFieldProps";

export function MultipleChoiceField({
  question,
  value,
  onChange,
}: QuestionFieldProps) {
  const selected = Array.isArray(value) ? value : [];

  const toggle = (optionId: string, checked: boolean) => {
    if (checked) {
      onChange([...selected, optionId]);
      return;
    }
    onChange(selected.filter((id) => id !== optionId));
  };

  return (
    <div className="space-y-4">
      <p className="font-display text-lg font-semibold leading-snug text-foreground">
        {question.text}
      </p>
      <p className="text-xs text-muted-foreground">Можно выбрать несколько</p>
      <div className="grid gap-2.5">
        {(question.options ?? []).map((option) => {
          const checked = selected.includes(option.id);
          return (
            <label
              key={option.id}
              htmlFor={`${question.id}-${option.id}`}
              className="option-card option-card-checkbox"
              data-selected={checked}
            >
              <Checkbox
                id={`${question.id}-${option.id}`}
                checked={checked}
                onCheckedChange={(state) => toggle(option.id, state === true)}
                className="sr-only"
              />
              <span className="option-indicator" aria-hidden />
              <span className="text-sm font-medium leading-snug">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
