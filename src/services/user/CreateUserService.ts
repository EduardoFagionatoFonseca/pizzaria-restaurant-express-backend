import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface CreateUserProps {
  username: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ username, email, password }: CreateUserProps) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        username,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
