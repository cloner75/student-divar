"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Models
var product_1 = require("../models/product");
// Consts
var Consts;
(function (Consts) {
    Consts["PERFIX"] = "product";
})(Consts || (Consts = {}));
/**
 * TODO Conversation Controller
 */
var Product = /** @class */ (function () {
    /**
     * TODO Constructor
     */
    function Product() {
    }
    /**
     * TODO Create Controller
     * @param {request} req
     * @param {response} res
     */
    Product.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var created, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, product_1.default.create(__assign(__assign({}, req.body), { userId: req.user._id }))];
                    case 1:
                        created = _a.sent();
                        return [2 /*return*/, res.send({ success: true, created: created })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500).send(err_1.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * TODO Update Controller
     * @param {request} req
     * @param {response} res
     */
    Product.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, updated, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params.id;
                        return [4 /*yield*/, product_1.default.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true })];
                    case 1:
                        updated = _a.sent();
                        return [2 /*return*/, res.send({ success: true, updated: updated })];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, res.status(500).send(err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * TODO Delete Controller
     * @param {request} req
     * @param {response} res
     */
    Product.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, product_1.default.deleteOne({ _id: req.params.id })];
                    case 1:
                        deleted = _a.sent();
                        return [2 /*return*/, res.send({ success: true, deleted: deleted })];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(500).send(err_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * TODO Find Controller
     * @param {request} req
     * @param {response} res
     */
    Product.prototype.find = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var products, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, product_1.default.find(req.query).sort({ onTop: 'desc' })];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, res.send({ success: true, data: products })];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(500).send(err_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * TODO Find One Controller
     * @param {request} req
     * @param {response} res
     */
    Product.prototype.findOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, res.send({ success: true })];
                }
                catch (err) {
                    return [2 /*return*/, res.status(500).send(err)];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * TODO Search Controller
     * @param {request} req
     * @param {response} res
     */
    Product.prototype.search = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, priceMin, priceMax, categoryId, cityId, type, searchBox, getProduct, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, title = _a.title, priceMin = _a.priceMin, priceMax = _a.priceMax, categoryId = _a.categoryId, cityId = _a.cityId, type = _a.type;
                        searchBox = {
                            status: { $ne: 0 },
                            price: {
                                $gte: +(priceMin - ((priceMin * 5) / 100)) || 0,
                                $lte: +(+priceMax + ((+priceMax * 5) / 100)) || 50000000000,
                            }
                        };
                        if (categoryId) {
                            Object.assign(searchBox, { categoryId: categoryId });
                        }
                        if (cityId) {
                            Object.assign(searchBox, { cityId: cityId });
                        }
                        if (type) {
                            Object.assign(searchBox, { type: type });
                        }
                        if (title) {
                            Object.assign(searchBox, {
                                title: { $regex: new RegExp('.*' + title + '.*', "i") }
                            });
                        }
                        return [4 /*yield*/, product_1.default.find(searchBox).sort({ onTop: 'desc' })];
                    case 1:
                        getProduct = _b.sent();
                        return [2 /*return*/, res.send({ success: true, data: getProduct })];
                    case 2:
                        err_5 = _b.sent();
                        return [2 /*return*/, res.status(500).send(err_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Product;
}());
exports.default = Product;
//# sourceMappingURL=product.js.map