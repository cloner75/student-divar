"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = void 0;
// Schema
var authorization_schema_1 = require("./authorization.schema");
/**
 * TODO Create Middleware
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
var signIn = function (req, res, next) {
    authorization_schema_1.default.signIn
        .validateAsync(req.body)
        .then(function (_response) { return next(); })
        .catch(function (err) { return res.status(422).send(err); });
};
exports.signIn = signIn;
/**
 * TODO Find Middleware
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
var signUp = function (req, res, next) {
    authorization_schema_1.default.signUp
        .validateAsync(req.body)
        .then(function (_response) { return next(); })
        .catch(function (err) { return res.status(422).send(err); });
};
exports.signUp = signUp;
//# sourceMappingURL=authorization.js.map