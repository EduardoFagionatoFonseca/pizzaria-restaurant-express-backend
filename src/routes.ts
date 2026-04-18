import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { categorySchema } from "./schemas/categorySchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductsController } from "./controllers/product/ListProductsController";
import {
  createProductSchema,
  listProductsSchema,
} from "./schemas/productSchema";
import { DeleteProductController } from "./controllers/product/DeleteProductController";

const router = Router();
const upload = multer(uploadConfig);

// Rotas users
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

router.post("/me", isAuthenticated, new DetailUserController().handle);

// Rotas Categories
router.get(
  "/categories",
  isAuthenticated,
  new ListCategoriesController().handle,
);

router.post(
  "/categories",
  isAuthenticated,
  isAdmin,
  validateSchema(categorySchema),
  new CreateCategoryController().handle,
);

// Rotas Products

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductsSchema),
  new ListProductsController().handle,
);

router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle,
);

router.delete(
  "/product",
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle,
);

export { router };
