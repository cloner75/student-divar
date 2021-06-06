// Packages
import { Schema, model } from "mongoose";
import * as paginate from "mongoose-paginate";
import * as timestamp from "mongoose-timestamp";

const CateogrySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false }
);

CateogrySchema.plugin(paginate);
CateogrySchema.plugin(timestamp);

const CateogryModel = model("categories", CateogrySchema);
CateogryModel.createIndexes();

export default CateogryModel;
