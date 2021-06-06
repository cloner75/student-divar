// Packages
import { Router } from 'express';

// Controllers
import ProductController from "../controllers/product";

// Middlewares

// Consts
const router = Router();
enum Names {
  CREATE = "/create",
  UPDATE = "/update/:id",
  DELETE = "/delete/:id",
  FIND = "/find",
  FIND_ONE = "/find/:id",
  SEARCH = "/search"
}
const Product: any = new ProductController();

router
  .post(Names.CREATE, Product.create)
  .put(Names.UPDATE, Product.update)
  .delete(Names.DELETE, Product.delete)
  .get(Names.FIND, Product.find)
  .get(Names.FIND_ONE, Product.findOne)
  .get(Names.SEARCH, Product.search);

export default router;

