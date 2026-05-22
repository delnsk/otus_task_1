import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { ValidationError } from "./domain/errors.js";
import { createCompositionRoot } from "./compositionRoot.js";
import { createApiRouter } from "./presentation/routes.js";

export function createApp() {
  const app = express();
  const { questionsController, answersController } = createCompositionRoot();

  app.use(cors());
  app.use(express.json());

  app.use("/api", createApiRouter(questionsController, answersController));

  app.use(
    (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
      if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
        return;
      }

      console.error(error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    },
  );

  return app;
}
