// Packages
import { Schema, model } from "mongoose";
import * as paginate from "mongoose-paginate";
import * as timestamp from "mongoose-timestamp";

const CitySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false }
);

CitySchema.plugin(paginate);
CitySchema.plugin(timestamp);

const CityModel = model("cities", CitySchema);
CityModel.createIndexes();

export default CityModel;
