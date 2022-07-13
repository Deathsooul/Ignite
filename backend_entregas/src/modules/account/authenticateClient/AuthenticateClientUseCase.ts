import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { request } from "express";

interface IAuthenticateClient {
  userName: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ userName, password }: IAuthenticateClient) {
    // Receber o username e password
    // Verify do userName cadastrado
    const client = await prisma.clients.findFirst({
      where: { userName },
    });

    if (!client) {
      throw new Error("Username or password invalid!");
    }
    // Verify se a senha corresponder ao username

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    //Gerar o token

    const token = sign({ userName }, "7595f70d964755441d41bc558e3c039e", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
