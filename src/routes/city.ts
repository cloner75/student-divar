// Packages
import { Router } from 'express';

// Controllers
import CityController from "../controllers/city";

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
const City: any = new CityController();

router
    .post(Names.CREATE, City.create)
    .put(Names.UPDATE, City.update)
    .delete(Names.DELETE, City.delete)
    .get(Names.FIND, City.find)
    .get(Names.FIND_ONE, City.findOne);

export default router;

