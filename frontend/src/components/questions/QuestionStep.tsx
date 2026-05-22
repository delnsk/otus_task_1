import { Card, CardContent } from "@/components/ui/card";
import type { AnswersMap, Question } from "@/domain/question";
import { QuestionRenderer } from "./QuestionRenderer";

interface QuestionStepProps {
  question: Question;
  questionIndex: number;
  answers: AnswersMap;
  onAnswerChange: (questionId: string, value: AnswersMap[string]) => void;
}

export function QuestionStep({
  question,
  questionIndex,
  answers,
  onAnswerChange,
}: QuestionStepProps) {
  return (
    <Card className="animate-fade-in-up" key={question.id}>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-start gap-3">
          <span
            className="font-display flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, hsl(12 95% 62%), hsl(330 90% 58%))",
            }}
          >
            {questionIndex + 1}
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <QuestionRenderer
              question={question}
              value={answers[question.id]}
              onChange={(value) => onAnswerChange(question.id, value)}
            />
          </div>
        </div>
        {question.required && (
          <p className="text-xs text-muted-foreground/80 pl-12">
            * Обязательный вопрос
          </p>
        )}
      </CardContent>
    </Card>
  );
}
