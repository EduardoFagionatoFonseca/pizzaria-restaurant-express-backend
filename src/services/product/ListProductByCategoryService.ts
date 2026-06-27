import prismaClient from "../../prisma";
interface GetCategoryProductsProps {
  category_id: string;
}

export class ListProductsByCategoryService {
  async execute({ category_id }: GetCategoryProductsProps) {
    try {
      const category = await prismaClient.category.findUnique({
        where: {
          id: category_id,
        },
      });
      if (!category) {
        throw new Error("Category not found!");
      }

      const products = await prismaClient.product.findMany({
        where: {
          category_id: category_id,
          disabled: false,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          disabled: true,
          category_id: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to find products from category");
    }
  }
}
