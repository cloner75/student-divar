// Packages
import { Schema, model } from "mongoose";
import * as paginate from "mongoose-paginate";
import * as timestamp from "mongoose-timestamp";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    price: { type: Number, required: true, unique: true },
    images: { type: Array, required: true, unique: true },
  },
  { versionKey: false }
);

ProductSchema.plugin(paginate);
ProductSchema.plugin(timestamp);

const ProductModel = model("products", ProductSchema);
ProductModel.createIndexes();

export default ProductModel;
