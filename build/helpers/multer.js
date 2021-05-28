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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resize = exports.upload = exports.config = void 0;
// Package
var multer = require("multer");
var path = require("path");
var _ = require("lodash");
var Jimp = require("jimp");
// Conts
var mimeTypes_1 = require("./../configs/mimeTypes");
var sizeOf = require("image-size");
var LIMIT = 10;
var UPLOAD = path.join(__dirname, "./../uploads/");
// Functions
/**
 * TODO Set Config Multer
 */
var config = function () {
    return multer({
        storage: multer.diskStorage({
            destination: function (_req, _file, cb) {
                cb(null, UPLOAD);
            },
        }),
        // FileFilter
        fileFilter: function (_req, file, cb) {
            _.keys(mimeTypes_1.default).includes(file.mimetype)
                ? cb(null, true)
                : cb(new Error("File Type Not Permissend"));
        },
        // Limits
        limits: { fileSize: LIMIT * 1024 * 1024 },
    });
};
exports.config = config;
/**
 * TODO Upload Files
 */
var upload = function (req) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var files, body, HOST, urls, _i, files_1, file, cdnFile, fieldname, path_1, originalName, mimeType, size, encoding, destination, typeFile, fileUrls;
        return __generator(this, function (_a) {
            try {
                files = req.files, body = req.body;
                HOST = process.env.HOST;
                urls = [];
                for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                    file = files_1[_i];
                    cdnFile = file.filename, fieldname = file.fieldname, path_1 = file.path, originalName = file.originalname, mimeType = file.mimetype, size = file.size, encoding = file.encoding, destination = file.destination;
                    typeFile = mimeTypes_1.default[mimeType].type;
                    fileUrls = {
                        cdnAddress: "" + HOST + cdnFile,
                    };
                    _.assign(fileUrls, {
                        success: true,
                        cdnAddress: HOST.concat(cdnFile),
                        cdnFile: cdnFile,
                        path: path_1,
                        originalName: originalName,
                        mimeType: mimeType,
                        size: size,
                        typeFile: typeFile,
                        typeReceive: body.type,
                        encoding: encoding,
                        destination: destination,
                        fieldname: fieldname,
                    });
                    if (_.isEqual(typeFile, "image")) {
                        _.assign(fileUrls, {
                            formats: {
                                thumbnail: "" + HOST + cdnFile + "?type=thumbnail",
                                512: "" + HOST + cdnFile + "?type=512",
                                128: "" + HOST + cdnFile + "?type=128",
                                blur: "" + HOST + cdnFile + "?type=blur",
                            },
                        });
                        exports.resize(cdnFile);
                    }
                    urls.push(fileUrls);
                }
                resolve(urls);
            }
            catch (err) {
                reject(err);
            }
            return [2 /*return*/];
        });
    }); });
};
exports.upload = upload;
/**
 * TODO Set Resize Multer
 */
var resize = function (cdnFile) {
    var _a = sizeOf(UPLOAD.concat(cdnFile)), height = _a.height, width = _a.width;
    var converLiset = [
        {
            fileName: "thumbnail-" + cdnFile,
            width: 256,
            height: height / (width / 256),
            quality: 50,
        },
        {
            fileName: "512-" + cdnFile,
            width: 512,
            height: height / (width / 512),
            quality: 40,
        },
        {
            fileName: "128-" + cdnFile,
            width: 128,
            height: height / (width / 128),
            quality: 30,
        },
        {
            fileName: "blur-" + cdnFile,
            width: 128,
            height: height / (width / 128),
            quality: 50,
            blur: 5,
        },
    ];
    Jimp.read(UPLOAD.concat(cdnFile), function (_err, image) {
        for (var _i = 0, converLiset_1 = converLiset; _i < converLiset_1.length; _i++) {
            var item = converLiset_1[_i];
            image.resize(item.width, item.height).quality(item.quality);
            item.blur ? image.blur(item.blur) : false;
            image.write(UPLOAD.concat(item.fileName));
        }
    });
};
exports.resize = resize;
//# sourceMappingURL=multer.js.map