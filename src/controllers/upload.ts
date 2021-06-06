// Packages
import * as _ from "lodash";
import { Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';

// Models
import UploadModel from "../models/upload";

// Helper
import Multer from '../helpers/multer';

// Consts
enum Consts {
  PERFIX = 'upload'
}

/**
 * TODO Conversation Controller
 */
class Upload {
  /**
   * TODO Constructor
   */
  constructor() { }

  /**
   * TODO Create Controller
   * @param {request} req
   * @param {response} res
   */
  async upload(req: Request, res: Response) {
    try {
      const files: any = await Multer.upload(req);
      files.map(async item => {
        await UploadModel.create(item);
      });
      return res.send({ success: true, data: files });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  /**
   * TODO Find One Controller
   * @param {request} req
   * @param {response} res
   */
  async show(req: Request, res: Response) {
    try {
      const cdnFile: string = req.params.name;
      const getFile: any = await UploadModel.findOne({ cdnFile });
      if (!getFile) {
        return res.status(404).send({ success: false });
      }
      fs.readFile(path.join(__dirname, `./../../uploads/${cdnFile}`), (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.type(getFile.mimeType).send(data);
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

export default Upload;