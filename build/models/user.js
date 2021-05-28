"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var mongoose_1 = require("mongoose");
var paginate = require("mongoose-paginate");
var timestamp = require("mongoose-timestamp");
var userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true, default: 1 },
    name: { type: String, required: false },
    family: { type: String, required: false },
    mobile: { type: String, required: false },
    avatar: { type: String, required: false },
    isUser: { type: Boolean, required: true, default: true },
}, { versionKey: false });
userSchema.plugin(paginate);
userSchema.plugin(timestamp);
var UserModel = mongoose_1.model("users", userSchema);
UserModel.createIndexes();
exports.default = UserModel;
//# sourceMappingURL=user.js.map