"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var mongoose_1 = require("mongoose");
var paginate = require("mongoose-paginate");
var timestamp = require("mongoose-timestamp");
var ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    price: { type: Number, required: true, unique: true },
    images: { type: Array, required: true, unique: true },
}, { versionKey: false });
ProductSchema.plugin(paginate);
ProductSchema.plugin(timestamp);
var ProductModel = mongoose_1.model("products", ProductSchema);
ProductModel.createIndexes();
exports.default = ProductModel;
//# sourceMappingURL=product.js.map