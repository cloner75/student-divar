"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var mongoose_1 = require("mongoose");
var paginate = require("mongoose-paginate");
var timestamp = require("mongoose-timestamp");
var CateogrySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
}, { versionKey: false });
CateogrySchema.plugin(paginate);
CateogrySchema.plugin(timestamp);
var CateogryModel = mongoose_1.model("categories", CateogrySchema);
CateogryModel.createIndexes();
exports.default = CateogryModel;
//# sourceMappingURL=category.js.map