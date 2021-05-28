// Packages
import { Router } from 'express';

// Controllers
import CategoryController from "../controllers/category";

// Middlewares

// Consts
const router = Router();
enum Names {
    CREATE = "/create",
    UPDATE = "/update/:id",
    DELETE = "/delete/:id",
    FIND = "/find",
    FIND_ONE = "/find/:id",
}
const Category: any = new CategoryController();

router
    .post(Names.CREATE, Category.create)
    .put(Names.UPDATE, Category.update)
    .delete(Names.DELETE, Category.delete)
    .get(Names.FIND, Category.find)
    .get(Names.FIND_ONE, Category.findOne);

export default router;

