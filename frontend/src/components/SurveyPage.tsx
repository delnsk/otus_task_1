import { Button } from "@/components/ui/button";
import { useSurvey } from "@/hooks/useSurvey";
import type { SurveyApi } from "@/domain/surveyApi";
import { QuestionStep } from "./questions/QuestionStep";
import { SurveyProgress } from "./questions/SurveyProgress";
import { SuccessScreen } from "./SuccessScreen";

interface SurveyPageProps {
  api: SurveyApi;
}

export function SurveyPage({ api }: SurveyPageProps) {
  const {
    status,
    survey,
    answers,
    currentIndex,
    totalQuestions,
    answeredCount,
    isLastQuestion,
    isSegmentAnswered,
    error,
    successMessage,
    setAnswer,
    goNext,
    goPrev,
    submit,
    reset,
  } = useSurvey(api);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
        <div
          className="size-14 rounded-2xl loading-shimmer"
          style={{ animation: "pulse-ring 2s ease-in-out infinite" }}
          aria-hidden
        />
        <p className="text-sm text-muted-foreground">Загружаем анкету...</p>
      </div>
    );
  }

  if (status === "error" && !survey) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="glass-card max-w-md rounded-2xl p-8 text-center">
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  if (status === "success" && successMessage) {
    return <SuccessScreen message={successMessage} onReset={reset} />;
  }

  if (!survey) {
    return null;
  }

  const currentQuestion = survey.questions[currentIndex];

  return (
    <div className="mx-auto max-w-xl space-y-8 px-4 py-12 sm:py-16">
      <header className="space-y-4 text-center animate-fade-in-up">
        <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          <span className="text-gradient">{survey.title}</span>
        </h1>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          Ответьте на вопросы — это займёт пару минут
        </p>
      </header>

      <div className="animate-fade-in-up stagger-1">
        <SurveyProgress
          total={totalQuestions}
          answeredCount={answeredCount}
          currentIndex={currentIndex}
          isSegmentAnswered={isSegmentAnswered}
        />
      </div>

      <div className="animate-fade-in-up stagger-2">
        <QuestionStep
          question={currentQuestion}
          questionIndex={currentIndex}
          answers={answers}
          onAnswerChange={setAnswer}
        />
      </div>

      {error && (
        <p className="animate-fade-in-up rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex justify-between gap-3 pt-2 animate-fade-in-up stagger-3">
        <Button
          variant="outline"
          size="lg"
          onClick={goPrev}
          disabled={currentIndex === 0 || status === "submitting"}
        >
          Назад
        </Button>

        {isLastQuestion ? (
          <Button
            size="lg"
            onClick={() => void submit()}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Отправка..." : "Отправить"}
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={goNext}
            disabled={status === "submitting"}
          >
            Далее
          </Button>
        )}
      </div>
    </div>
  );
}
