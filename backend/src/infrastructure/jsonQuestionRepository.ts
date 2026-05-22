import { readFile } from "node:fs/promises";
import type { Survey } from "../domain/question.js";
import type { IQuestionRepository } from "../domain/repositories.js";
import { questionsFilePath } from "./paths.js";

export class JsonQuestionRepository implements IQuestionRepository {
  async getSurvey(): Promise<Survey> {
    const raw = await readFile(questionsFilePath, "utf-8");
    return JSON.parse(raw) as Survey;
  }
}
