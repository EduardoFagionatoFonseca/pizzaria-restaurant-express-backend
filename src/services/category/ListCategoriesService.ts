import prismaClient from "../../prisma";

export class ListCategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return categories;
  }
}
