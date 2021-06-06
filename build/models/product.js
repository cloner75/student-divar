"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var mongoose_1 = require("mongoose");
var paginate = require("mongoose-paginate");
var timestamp = require("mongoose-timestamp");
var ProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    files: { type: Array, required: false },
    type: { type: Number, required: true },
    status: { type: Number, required: true, default: 0 },
    cityId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    price: { type: Number, required: false },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    onTop: { type: Boolean, required: true, default: false }
}, { versionKey: false });
ProductSchema.plugin(paginate);
ProductSchema.plugin(timestamp);
var ProductModel = mongoose_1.model("products", ProductSchema);
ProductModel.createIndexes();
exports.default = ProductModel;
//# sourceMappingURL=product.js.map