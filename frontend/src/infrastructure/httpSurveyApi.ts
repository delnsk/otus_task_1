import type { AnswersMap, SubmitResult, Survey } from "@/domain/question";
import type { SurveyApi } from "@/domain/surveyApi";

export class HttpSurveyApi implements SurveyApi {
  async getQuestions(): Promise<Survey> {
    const response = await fetch("/api/questions");
    if (!response.ok) {
      throw new Error("Не удалось загрузить вопросы");
    }
    return response.json() as Promise<Survey>;
  }

  async submitAnswers(answers: AnswersMap): Promise<SubmitResult> {
    const response = await fetch("/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(body?.error ?? "Не удалось отправить ответы");
    }

    return response.json() as Promise<SubmitResult>;
  }
}
