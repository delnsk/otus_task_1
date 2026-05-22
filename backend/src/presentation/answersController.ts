import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import type { SubmitAnswerUseCase } from "../application/submitAnswer.js";

const answersBodySchema = z.object({
  answers: z.record(
    z.union([z.string(), z.array(z.string())]),
  ),
});

export class AnswersController {
  constructor(private readonly submitAnswerUseCase: SubmitAnswerUseCase) {}

  post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = answersBodySchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          error: "Некорректное тело запроса",
          details: parsed.error.flatten(),
        });
        return;
      }

      const result = await this.submitAnswerUseCase.execute(parsed.data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
