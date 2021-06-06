"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var express_1 = require("express");
// Controllers
var authorization_1 = require("./../controllers/authorization");
// Middlewares
var authorization_2 = require("./../middlewares/authorization");
// Consts
var router = express_1.Router();
var Names;
(function (Names) {
    Names["ROOT"] = "/signin";
    Names["PARAM"] = "/signup";
    Names["FIND"] = "/:id";
})(Names || (Names = {}));
var Authorization = new authorization_1.default();
router
    .post(Names.ROOT, authorization_2.signIn, Authorization.signIn)
    .post(Names.PARAM, authorization_2.signUp, Authorization.signUp)
    .get(Names.FIND, Authorization.find);
exports.default = router;
//# sourceMappingURL=authorization.js.map