import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserServiceProps {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthUserServiceProps) {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error("wrong email/password");
      }

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("wrong email/password");
      }

      //GERAR TOKEN JWT

      const token = sign(
        {
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET as string,
        {
          subject: user.id,
          expiresIn: "30d",
        },
      );

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: token,
      };
    } catch (error) {
      throw new Error(
        "Erro ao logar. Verifique se seus dados estao preenchidos corretamente",
      );
    }
  }
}
