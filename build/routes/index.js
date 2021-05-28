"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Routes
var authorization_1 = require("./authorization");
var category_1 = require("./category");
var render_1 = require("./render");
// authorization(router, '/autorization?');
exports.default = {
    authorization: authorization_1.default,
    category: category_1.default,
    render: render_1.default
};
//# sourceMappingURL=index.js.map