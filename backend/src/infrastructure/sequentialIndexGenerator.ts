import { readdir } from "node:fs/promises";
import type { IAnswerIndexGenerator } from "../domain/repositories.js";
import { answersDirPath } from "./paths.js";

export class SequentialIndexGenerator implements IAnswerIndexGenerator {
  async nextId(): Promise<string> {
    let maxIndex = 0;

    try {
      const files = await readdir(answersDirPath);
      for (const file of files) {
        const match = /^answer-(\d{3})\.json$/.exec(file);
        if (match) {
          maxIndex = Math.max(maxIndex, Number.parseInt(match[1], 10));
        }
      }
    } catch {
      maxIndex = 0;
    }

    const next = maxIndex + 1;
    return `answer-${String(next).padStart(3, "0")}`;
  }
}
