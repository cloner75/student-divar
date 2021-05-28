// Packages
import { Schema, model } from "mongoose";
import * as paginate from "mongoose-paginate";
import * as timestamp from "mongoose-timestamp";

const UploadSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, required: false },
    visionId: { type: Schema.Types.ObjectId, required: false }, // categoryId or ProductId or UserId
    typeReceive: { type: String, required: true }, // 0 => category 1->product 2 => profile
    fileName: { type: String, required: true, index: true },
    typeFile: { type: String, required: true, index: true },
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

UploadSchema.plugin(paginate);
UploadSchema.plugin(timestamp);

const uploadModel = model("uploads", UploadSchema);
uploadModel.createIndexes();

export default uploadModel;
