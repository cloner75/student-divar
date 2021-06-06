// Packages
import { Router } from 'express';

// Controllers
import UploadController from "../controllers/upload";
import Multer from '../helpers/multer';

// Middlewares

// Consts
const router = Router();
enum Names {
  CREATE = "/upload",
  SHOW = "/show/:name",
}
const Upload: any = new UploadController();

router
  .post(Names.CREATE,Multer.config(), Upload.upload)
  .get(Names.SHOW, Upload.show);

export default router;

