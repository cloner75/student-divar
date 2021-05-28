"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var express_1 = require("express");
// Consts
var router = express_1.Router();
router
    .get('/index', function (req, res) {
    return res.sendFile('index.html');
});
exports.default = router;
//# sourceMappingURL=render.js.map