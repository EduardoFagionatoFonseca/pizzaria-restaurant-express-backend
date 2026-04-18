import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { categorySchema } from "./schemas/categorySchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

const router = Router();

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

router.post(
  "/category",
  isAuthenticated,
  validateSchema(categorySchema),
  new CreateCategoryController().handle,
);
export { router };
