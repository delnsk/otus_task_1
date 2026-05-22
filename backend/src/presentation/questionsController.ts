import type { Request, Response, NextFunction } from "express";
import type { GetQuestionsUseCase } from "../application/getQuestions.js";

export class QuestionsController {
  constructor(private readonly getQuestionsUseCase: GetQuestionsUseCase) {}

  get = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const survey = await this.getQuestionsUseCase.execute();
      res.json(survey);
    } catch (error) {
      next(error);
    }
  };
}
