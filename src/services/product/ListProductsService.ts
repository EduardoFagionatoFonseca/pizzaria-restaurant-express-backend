import prismaClient from "../../prisma";

interface ListProductsServiceProps {
  disabled?: string;
}

export class ListProductsService {
  async execute({ disabled }: ListProductsServiceProps) {
    try {
      const products = await prismaClient.product.findMany({
        where: { disabled: disabled === "true" ? true : false },
        orderBy: { createdAt: "desc" },
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
      });

      return products;
    } catch (error) {
      throw new Error("Unable to get products");
    }
  }
}
