import prismaClient from "../../prisma";

interface DeleteProductServiceProps {
  product_id: string;
}

export class DeleteProductService {
  async execute({ product_id }: DeleteProductServiceProps) {
    try {
      await prismaClient.product.update({
        where: {
          id: product_id,
        },
        data: {
          disabled: true,
        },
      });

      return { message: "Product sucessfully deleted/archived" };
    } catch (error) {
      throw new Error("Falha ao deletar o produto");
    }
  }
}
