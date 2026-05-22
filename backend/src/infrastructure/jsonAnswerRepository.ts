import { mkdir, writeFile } from "node:fs/promises";
import type { StoredAnswer } from "../domain/question.js";
import type { IAnswerRepository } from "../domain/repositories.js";
import { answersDirPath } from "./paths.js";

export class JsonAnswerRepository implements IAnswerRepository {
  async save(answer: StoredAnswer): Promise<void> {
    await mkdir(answersDirPath, { recursive: true });
    const filePath = `${answersDirPath}/${answer.id}.json`;
    await writeFile(filePath, JSON.stringify(answer, null, 2), "utf-8");
  }
}
