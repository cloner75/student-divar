// Packages
import { Router } from 'express';

// Controllers
import AuthorizationController from "./../controllers/authorization";

// Middlewares
import { signIn, signUp } from "./../middlewares/authorization";

// Consts
const router = Router();
enum Names {
  ROOT = "/signin",
  PARAM = "/signup",
  FIND = '/:id'
}
const Authorization: any = new AuthorizationController();

router
  .post(Names.ROOT, signIn, Authorization.signIn)
  .post(Names.PARAM, signUp, Authorization.signUp)
  .get(Names.FIND, Authorization.find);

export default router;

