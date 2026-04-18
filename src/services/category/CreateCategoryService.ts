import prismaClient from "../../prisma";

interface CreateCategoryProps {
  name: string;
}

export class CreateCategoryService {
  async execute({ name }: CreateCategoryProps) {
    try {
      const category = await prismaClient.category.create({
        data: {
          name: name,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return category;
    } catch (error) {
      throw new Error("unable to create category");
    }
  }
}
