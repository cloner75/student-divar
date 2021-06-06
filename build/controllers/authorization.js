"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = require("bcrypt");
// Models
var user_1 = require("./../models/user");
// Helper
var jwt_1 = require("./../helpers/jwt");
// Consts
var Consts;
(function (Consts) {
    Consts["name"] = "user";
    Consts[Consts["saltRounds"] = 10] = "saltRounds";
})(Consts || (Consts = {}));
/**
 * TODO Conversation Controller
 */
var Authorization = /** @class */ (function () {
    /**
     * TODO Constructor
     */
    function Authorization() {
    }
    /**
     * TODO Root Controller
     * @param {request} req
     * @param {response} res
     */
    Authorization.prototype.signIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, passwordInput, checkUser, _b, password, rest, token, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, passwordInput = _a.password;
                        return [4 /*yield*/, user_1.default.findOne({ email: email })];
                    case 1:
                        checkUser = _c.sent();
                        if (!checkUser || !bcrypt_1.compareSync(passwordInput, checkUser.password)) {
                            return [2 /*return*/, res.sendStatus(404)];
                        }
                        _b = checkUser.toObject(), password = _b.password, rest = __rest(_b, ["password"]);
                        token = jwt_1.signator(rest);
                        // const token = jwt.sign(rest, process.env.SECRET_KEY_JWT, {
                        //     expiresIn: "24h",
                        // });
                        return [2 /*return*/, res.send({ success: true, token: token })];
                    case 2:
                        err_1 = _c.sent();
                        return [2 /*return*/, res.status(500).send(err_1)];
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
    Authorization.prototype.signUp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, passwordInput, email, checkUser, salt, hash, register, _b, password, rest, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _a = req.body, passwordInput = _a.password, email = _a.email;
                        console.log({ email: email });
                        return [4 /*yield*/, user_1.default.findOne({ email: email })];
                    case 1:
                        checkUser = _c.sent();
                        if (checkUser) {
                            return [2 /*return*/, res.status(408).send({ success: false, message: 'duplicated' })];
                        }
                        return [4 /*yield*/, bcrypt_1.genSaltSync(Consts.saltRounds)];
                    case 2:
                        salt = _c.sent();
                        return [4 /*yield*/, bcrypt_1.hashSync(passwordInput, salt)];
                    case 3:
                        hash = _c.sent();
                        return [4 /*yield*/, user_1.default.create({ email: email, password: hash })];
                    case 4:
                        register = _c.sent();
                        _b = register.toObject(), password = _b.password, rest = __rest(_b, ["password"]);
                        return [2 /*return*/, res.status(200).send({ token: jwt_1.signator(rest) })];
                    case 5:
                        err_2 = _c.sent();
                        console.log('signUp', err_2.message);
                        return [2 /*return*/, res.status(500).send(err_2.message)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * TODO Find One Controller
     * @param {request} req
     * @param {response} res
     */
    Authorization.prototype.find = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var checkUser, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_1.default.findOne({ _id: req.params.id })];
                    case 1:
                        checkUser = _a.sent();
                        if (!checkUser) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'not found' })];
                        }
                        delete checkUser.password;
                        return [2 /*return*/, res.status(200).send({ success: true, data: checkUser })];
                    case 2:
                        err_3 = _a.sent();
                        console.log('signUp', err_3.message);
                        return [2 /*return*/, res.status(500).send(err_3.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Authorization;
}());
exports.default = Authorization;
//# sourceMappingURL=authorization.js.map