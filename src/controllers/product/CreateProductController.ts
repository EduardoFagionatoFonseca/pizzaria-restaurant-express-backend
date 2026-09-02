import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

export class CreateProductController {
  async handle(req: Request, res: Response) {
    try {
      const { name, price, description, category_id } = req.body;

      if (!req.file) {
        throw new Error("The product image is required");
      }

      const createProduct = new CreateProductService();
      const product = await createProduct.execute({
        name,
        price: parseInt(price), //Converte string para Int
        description,
        category_id,
        imageBuffer: req.file.buffer,
        imageName: req.file.originalname,
      });

      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Não foi possível cadastrar o produto. Verifique os dados e a imagem enviada.",
      });
    }
  }
}
