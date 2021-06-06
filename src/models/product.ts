// Packages
import { Schema, model } from "mongoose";
import * as paginate from "mongoose-paginate";
import * as timestamp from "mongoose-timestamp";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    files: { type: Array, required: false },
    type: { type: Number, required: true },
    status: { type: Number, required: true, default: 0 },
    cityId: { type: Schema.Types.ObjectId, required: true },
    categoryId: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: false },
    userId: { type: Schema.Types.ObjectId, required: true },
    onTop: { type: Boolean, required: true, default: false }
  },
  { versionKey: false }
);

ProductSchema.plugin(paginate);
ProductSchema.plugin(timestamp);

const ProductModel = model("products", ProductSchema);
ProductModel.createIndexes();

export default ProductModel;
