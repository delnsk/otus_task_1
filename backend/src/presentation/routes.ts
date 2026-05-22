import { Router } from "express";
import type { AnswersController } from "./answersController.js";
import type { QuestionsController } from "./questionsController.js";

export function createApiRouter(
  questionsController: QuestionsController,
  answersController: AnswersController,
): Router {
  const router = Router();

  router.get("/questions", questionsController.get);
  router.post("/answers", answersController.post);

  return router;
}
