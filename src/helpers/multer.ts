// Package
import * as multer from "multer";
import * as path from "path";
import * as _ from "lodash";
import * as Jimp from "jimp";

// Conts
import mimeTypes from "./../configs/mimeTypes";
const sizeOf = require("image-size");
const LIMIT: number = 10;
const UPLOAD: string = path.join(__dirname, "./../uploads/");

// Functions

/**
 * TODO Set Config Multer
 */
export const config = () => {
  return multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, UPLOAD);
      },
    }),

    // FileFilter
    fileFilter: (_req, file, cb) => {
      _.keys(mimeTypes).includes(file.mimetype)
        ? cb(null, true)
        : cb(new Error("File Type Not Permissend"));
    },
    // Limits
    limits: { fileSize: LIMIT * 1024 * 1024 },
  });
};

/**
 * TODO Upload Files
 */
export const upload = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { files, body } = req;
      const { HOST } = process.env;
      const urls = [];
      for (let file of files) {
        const {
          filename: cdnFile,
          fieldname,
          path,
          originalname: originalName,
          mimetype: mimeType,
          size,
          encoding,
          destination,
        } = file;
        const typeFile: string = mimeTypes[mimeType].type;
        const fileUrls: object = {
          cdnAddress: `${HOST}${cdnFile}`,
        };
        _.assign(fileUrls, {
          success: true,
          cdnAddress: HOST.concat(cdnFile),
          cdnFile,
          path,
          originalName,
          mimeType,
          size,
          typeFile,
          typeReceive: body.type,
          encoding,
          destination,
          fieldname,
        });
        if (_.isEqual(typeFile, "image")) {
          _.assign(fileUrls, {
            formats: {
              thumbnail: `${HOST}${cdnFile}?type=thumbnail`,
              512: `${HOST}${cdnFile}?type=512`,
              128: `${HOST}${cdnFile}?type=128`,
              blur: `${HOST}${cdnFile}?type=blur`,
            },
          });
          exports.resize(cdnFile);
        }
        urls.push(fileUrls);
      }
      resolve(urls);
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * TODO Set Resize Multer
 */
export const resize = (cdnFile: string) => {
  const { height, width } = sizeOf(UPLOAD.concat(cdnFile));
  const converLiset = [
    {
      fileName: `thumbnail-${cdnFile}`,
      width: 256,
      height: height / (width / 256),
      quality: 50,
    },
    {
      fileName: `512-${cdnFile}`,
      width: 512,
      height: height / (width / 512),
      quality: 40,
    },
    {
      fileName: `128-${cdnFile}`,
      width: 128,
      height: height / (width / 128),
      quality: 30,
    },
    {
      fileName: `blur-${cdnFile}`,
      width: 128,
      height: height / (width / 128),
      quality: 50,
      blur: 5,
    },
  ];
  Jimp.read(UPLOAD.concat(cdnFile), (_err, image) => {
    for (let item of converLiset) {
      image.resize(item.width, item.height).quality(item.quality);
      item.blur ? image.blur(item.blur) : false;
      image.write(UPLOAD.concat(item.fileName));
    }
  });
};
