import prismaClient from "../../prisma";

export class ListUsersService {
  async execute() {
    return prismaClient.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
