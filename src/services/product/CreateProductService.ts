import { Readable } from "node:stream";
import prismaClient from "../../prisma";
import cloudinary from "../../config/cloudinary";

interface CreateProductServiceProps {
  name: string;
  price: number;
  description: string;
  category_id: string;
  imageBuffer: Buffer;
  imageName: string;
}

export class CreateProductService {
  async execute({
    name,
    price,
    description,
    category_id,
    imageBuffer,
    imageName,
  }: CreateProductServiceProps) {
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!categoryExists) {
      throw new Error("Category not found");
    }

    const productAlreadyExists = await prismaClient.product.findFirst({
      where: {
        name: name,
      },
    });

    if (productAlreadyExists) {
      throw new Error("A product with this name already exists!");
    }

    // ENVIAR PRO CLOUDINARY SALVAR A IMAGEM E PEGAR A URL
    let bannerUrl = "";

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
            public_id: `${Date.now()}-${imageName.split(".")[0]}`,
          },
          (error, uploadResult) => {
            if (error) {
              return reject(error);
            }
            return resolve(uploadResult);
          },
        );

        // Criar o stream do buffer e fazer pipe para o cloudinary
        const bufferStream = Readable.from(imageBuffer);
        bufferStream.pipe(uploadStream);
      });

      bannerUrl = result.secure_url;
    } catch (error) {
      console.log(error);
      throw new Error("Error while uploading image");
    }

    // SALVAR A URL DA IMAGEM E OS DADOS NO BANCO COMO UM NOVO PRODUTO

    const product = await prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: bannerUrl,
        category_id: category_id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        category_id: true,
        banner: true,
        createdAt: true,
      },
    });

    return product;
  }
}
