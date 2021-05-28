"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var express_1 = require("express");
// Controllers
var category_1 = require("../controllers/category");
// Middlewares
// Consts
var router = express_1.Router();
var Names;
(function (Names) {
    Names["CREATE"] = "/create";
    Names["UPDATE"] = "/update/:id";
    Names["DELETE"] = "/delete/:id";
    Names["FIND"] = "/find";
    Names["FIND_ONE"] = "/find/:id";
})(Names || (Names = {}));
var Category = new category_1.default();
router
    .post(Names.CREATE, Category.create)
    .put(Names.UPDATE, Category.update)
    .delete(Names.DELETE, Category.delete)
    .get(Names.FIND, Category.find)
    .get(Names.FIND_ONE, Category.findOne);
exports.default = router;
//# sourceMappingURL=category.js.map