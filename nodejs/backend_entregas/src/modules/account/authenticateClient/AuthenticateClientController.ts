import { Request, Response } from "express";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { userName, password } = request.body;

    const authenticateClientUsecase = new AuthenticateClientUseCase();
    const result = await authenticateClientUsecase.execute({
      userName,
      password,
    });

    return response.json(result);
  }
}
