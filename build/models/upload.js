"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var mongoose_1 = require("mongoose");
var paginate = require("mongoose-paginate");
var UploadSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false
});
UploadSchema.plugin(paginate);
var uploadModel = mongoose_1.model("uploads", UploadSchema);
uploadModel.createIndexes();
exports.default = uploadModel;
//# sourceMappingURL=upload.js.map