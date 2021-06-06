// Packages
import { Schema, model } from "mongoose";
import * as paginate from "mongoose-paginate";

const UploadSchema = new Schema(
  {
    cdnFile: { type: String, required: true, index: true },
    cdnAddress: { type: String, required: true },
    typeFile: { type: String, required: true, index: true },
    success: { type: Boolean, required: true },
    mimeType: { type: String, required: true },
    size: { type: String, required: true },
    path: { type: String, required: false },
    originalName: { type: String, required: false },
    encoding: { type: String, required: false },
    destination: { type: String, required: false },
    buffer: { type: Buffer, required: false },
    fieldname: { type: String, required: false },
    formats: {
      128: { type: String, required: false },
      512: { type: String, required: false },
      thumbnail: { type: String, required: false },
      blur: { type: String, required: false },
    },
  },
  {
    versionKey: false
  }
);

UploadSchema.plugin(paginate);

const uploadModel = model("uploads", UploadSchema);
uploadModel.createIndexes();

export default uploadModel;
