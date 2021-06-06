"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Routes
var authorization_1 = require("./authorization");
var category_1 = require("./category");
var city_1 = require("./city");
var product_1 = require("./product");
var upload_1 = require("./upload");
// authorization(router, '/autorization?');
exports.default = {
    authorization: authorization_1.default,
    category: category_1.default,
    city: city_1.default,
    product: product_1.default,
    upload: upload_1.default
};
//# sourceMappingURL=index.js.map