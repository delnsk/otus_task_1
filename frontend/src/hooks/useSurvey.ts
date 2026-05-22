import { useCallback, useEffect, useState } from "react";
import {
  countAnsweredQuestions,
  isQuestionAnswered,
  normalizeAnswers,
  validateAnswers,
  validateQuestion,
} from "@/application/validateAnswers";
import type { AnswersMap, Survey } from "@/domain/question";
import type { SurveyApi } from "@/domain/surveyApi";

type SurveyStatus = "loading" | "ready" | "submitting" | "success" | "error";

export function useSurvey(api: SurveyApi) {
  const [status, setStatus] = useState<SurveyStatus>("loading");
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await api.getQuestions();
      setSurvey(data);
      setAnswers({});
      setCurrentIndex(0);
      setStatus("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
      setStatus("error");
    }
  }, [api]);

  useEffect(() => {
    void load();
  }, [load]);

  const setAnswer = (questionId: string, value: AnswersMap[string]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError(null);
  };

  const goNext = () => {
    if (!survey) {
      return;
    }

    const question = survey.questions[currentIndex];
    const validationError = validateQuestion(question, answers[question.id]);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    if (currentIndex < survey.questions.length - 1) {
      setCurrentIndex((index) => index + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setError(null);
      setCurrentIndex((index) => index - 1);
    }
  };

  const submit = async () => {
    if (!survey) {
      return;
    }

    const currentQuestion = survey.questions[currentIndex];
    const stepError = validateQuestion(
      currentQuestion,
      answers[currentQuestion.id],
    );
    if (stepError) {
      setError(stepError);
      return;
    }

    const validationError = validateAnswers(survey.questions, answers);
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const result = await api.submitAnswers(
        normalizeAnswers(survey.questions, answers),
      );
      setSuccessMessage(result.message);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отправки");
      setStatus("ready");
    }
  };

  const reset = () => {
    setSuccessMessage(null);
    void load();
  };

  const totalQuestions = survey?.questions.length ?? 0;
  const answeredCount = survey
    ? countAnsweredQuestions(survey.questions, answers)
    : 0;
  const isLastQuestion =
    survey !== null && currentIndex === survey.questions.length - 1;

  const isSegmentAnswered = (index: number) => {
    if (!survey) {
      return false;
    }
    const question = survey.questions[index];
    return isQuestionAnswered(question, answers[question.id]);
  };

  return {
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
  };
}
