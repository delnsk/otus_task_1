import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const backendRoot = path.resolve(__dirname, "../..");
export const questionsFilePath = path.join(backendRoot, "data", "questions.json");
export const answersDirPath = path.join(backendRoot, "answers");
