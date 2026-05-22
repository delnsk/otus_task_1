interface SurveyProgressProps {
  total: number;
  answeredCount: number;
  currentIndex: number;
  isSegmentAnswered: (index: number) => boolean;
}

export function SurveyProgress({
  total,
  answeredCount,
  currentIndex,
  isSegmentAnswered,
}: SurveyProgressProps) {
  const percent = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  return (
    <div className="space-y-4" aria-label="Прогресс анкеты">
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Прогресс
        </p>
        <p className="font-display text-2xl font-bold tabular-nums">
          <span className="text-gradient">{percent}%</span>
        </p>
      </div>

      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuenow={answeredCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Отвечено ${answeredCount} из ${total}`}
      >
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className="progress-segment"
            data-answered={isSegmentAnswered(index)}
            data-current={index === currentIndex}
            title={`Вопрос ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
