import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
  userName: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, userName }: ICreateClient) {
    try {
      // Validar se o usuário existes
      const clientExist = await prisma.clients.findFirst({
        where: {
          userName: {
            equals: userName,
            mode: "insensitive",
          },
        },
      });

      if (clientExist) {
        throw new Error("Client already exists");
      }

      // Cryptografar a senha
      const hashPassword = await hash(password, 10);

      //Salvar o client
      const client = await prisma.clients.create({
        data: {
          userName,
          password: hashPassword,
        },
      });

      return client;
    } catch (error) {
      console.info(error);
    }
  }
}
