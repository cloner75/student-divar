"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.signator = void 0;
// Packages
var jwt = require("jsonwebtoken");
/**
 * TODO JWt Signator
 * @param {object} data
 */
var signator = function (data) {
    return jwt.sign(data, process.env.SECRET_KEY_JWT, { expiresIn: "1d" }, { algorithm: "RS256" });
};
exports.signator = signator;
/**
 * TODO JWt Signator
 * @param {object} data
 */
var verify = function (data) {
    return jwt.verify(data, process.env.SECRET_KEY_JWT, function (err, decode) {
        return err ? false : decode;
    });
};
exports.verify = verify;
//# sourceMappingURL=jwt.js.map