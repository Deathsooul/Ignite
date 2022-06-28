import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  async handle(request: Request, response: Response) {
    try {
      const { userName, password } = request["body"];

      const createClientUseCase = new CreateClientUseCase();
      const result = await createClientUseCase.execute({
        userName,
        password,
      });

      return response.json(result);
    } catch (error) {
      console.info(error);
    }
  }
}
