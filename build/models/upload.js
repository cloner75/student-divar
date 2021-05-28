"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var mongoose_1 = require("mongoose");
var paginate = require("mongoose-paginate");
var timestamp = require("mongoose-timestamp");
var UploadSchema = new mongoose_1.Schema({
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    visionId: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    typeReceive: { type: String, required: true },
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
}, {
    versionKey: false
});
UploadSchema.plugin(paginate);
UploadSchema.plugin(timestamp);
var uploadModel = mongoose_1.model("uploads", UploadSchema);
uploadModel.createIndexes();
exports.default = uploadModel;
//# sourceMappingURL=upload.js.map