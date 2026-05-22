import type { AnswerValue, AnswersMap, Question } from "@/domain/question";

export function isAnswerEmpty(value: AnswersMap[string] | undefined): boolean {
  return (
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

export function isQuestionAnswered(
  _question: Question,
  value: AnswersMap[string] | undefined,
): boolean {
  return !isAnswerEmpty(value);
}

export function countAnsweredQuestions(
  questions: Question[],
  answers: AnswersMap,
): number {
  return questions.filter((q) => isQuestionAnswered(q, answers[q.id])).length;
}

export function validateQuestion(
  question: Question,
  value: AnswersMap[string] | undefined,
): string | null {
  if (question.required && isAnswerEmpty(value)) {
    return `Заполните обязательный вопрос: «${question.text}»`;
  }
  return null;
}

export function validateAnswers(
  questions: Question[],
  answers: AnswersMap,
): string | null {
  for (const question of questions) {
    const value = answers[question.id];
    if (question.required && isAnswerEmpty(value)) {
      return `Заполните обязательный вопрос: «${question.text}»`;
    }
  }

  return null;
}

export function normalizeAnswers(
  questions: Question[],
  answers: AnswersMap,
): AnswersMap {
  const normalized: AnswersMap = {};

  for (const question of questions) {
    const value = answers[question.id];
    if (value === undefined || value === "") {
      continue;
    }

    if (question.type === "multiple" && Array.isArray(value) && value.length === 0) {
      continue;
    }

    normalized[question.id] = value as AnswerValue;
  }

  return normalized;
}
