"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Pacjages
var Joi = require("joi");
// Consts
var index_1 = require("./../configs/index");
var messages = {
    "any.required": index_1.default.errors[1],
    "object.unknown": index_1.default.errors[1],
    "array.base": index_1.default.errors[2],
    "string.base": index_1.default.errors[2],
    "string.pattern.base": index_1.default.errors[2],
    "any.only": index_1.default.errors[2],
    "string.empty": index_1.default.errors[10],
    "string.min": index_1.default.errors[11],
    "string.max": index_1.default.errors[12],
};
// Schemas
exports.default = {
    /**
     * TODO Export Schema Create
     */
    signIn: Joi.object({
        email: Joi.string().trim().required().messages(messages),
        password: Joi.string().trim().required().messages(messages),
    }),
    /**
     * TODO Export Schema Find
     */
    signUp: Joi.object({
        // username: Joi.string().trim().required().messages(messages),
        email: Joi.string().trim().email().required().messages(messages),
        password: Joi.string().trim().required().messages(messages),
    }),
};
//# sourceMappingURL=authorization.schema.js.map