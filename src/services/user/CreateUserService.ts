import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface CreateUserProps {
  username: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ username, email, password }: CreateUserProps) {
    try {
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      if (userAlreadyExists) {
        throw new Error("User already exists!");
      }

      const normalizedUsername = username.toLowerCase().trim();
      if (!normalizedUsername) {
        throw new Error("Username is required and cannot be empty");
      }
      const passwordHash = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          username: normalizedUsername,
          email,
          password: passwordHash,
          role: "ADMIN", // NECESSARY FOR DEMONSTRATION PURPOSES SINCE THIS APP HAS AN ACCESS DENIED FOR NON ADMINS
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
    } catch (error) {
      throw new Error("Unable to create user");
    }
  }
}

export { CreateUserService };
