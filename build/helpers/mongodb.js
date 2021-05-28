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
exports.initialMongoQuery = exports.selectAllowFields = void 0;
var _ = require("lodash");
// Configs
var configs_1 = require("./../configs/");
// CONSTS
var Consts;
(function (Consts) {
    Consts[Consts["ORDER_DEFAULT"] = -1] = "ORDER_DEFAULT";
    Consts["CREATED_AT"] = "createdAt";
    Consts[Consts["LIMIT_DEFAULT"] = 10] = "LIMIT_DEFAULT";
    Consts[Consts["SKIP_DEFAULT"] = 1] = "SKIP_DEFAULT";
    Consts[Consts["PAGE_DEFAULT"] = 1] = "PAGE_DEFAULT";
    Consts["DATE_DEFAULT"] = "2017-01-01T01:00:00.000Z";
    Consts["ISO_DATE"] = "T01:00:00.000Z";
    Consts["ASC"] = "asc";
})(Consts || (Consts = {}));
var defaultFields = configs_1.default.defaultFields;
/**
 * TODO select allow fields
 * @param {string} fields
 * @returns {string} allowFields
 */
var selectAllowFields = function (fields, model) {
    if (model === void 0) { model = "user"; }
    var result = "";
    for (var _i = 0, _a = fields.split(","); _i < _a.length; _i++) {
        var item = _a[_i];
        if (defaultFields[model].includes(item)) {
            result += item + " ";
        }
    }
    return result;
};
exports.selectAllowFields = selectAllowFields;
/**
 * TODO initial option and where query
 * @param {object} query
 * @return {object} option
 * @return {object} where
 */
var initialMongoQuery = function (query, model) {
    if (model === void 0) { model = "user"; }
    var that = module.exports;
    var fields = query.fields, limit = query.limit, skip = query.skip, sort = query.sort, order = query.order, page = query.page, ids = query.ids, where = __rest(query, ["fields", "limit", "skip", "sort", "order", "page", "ids"]);
    var createdAtFrom = where.createdAtFrom, createdAtTo = where.createdAtTo, updatedAtFrom = where.updatedAtFrom, updatedAtTo = where.updatedAtTo, rest = __rest(where, ["createdAtFrom", "createdAtTo", "updatedAtFrom", "updatedAtTo"]);
    var result = {
        options: {
            select: fields
                ? that.selectAllowFields(fields)
                : defaultFields[model].join(" "),
            limit: Number(limit) || Consts.LIMIT_DEFAULT,
            skip: Number(skip) || Consts.SKIP_DEFAULT,
            page: Number(page) || Consts.PAGE_DEFAULT,
            sort: sort || Consts.CREATED_AT,
            order: order
                ? order.replace("asc", 1).replace("desc", -1)
                : Consts.ORDER_DEFAULT,
        },
        where: __assign(__assign({}, rest), { createdAt: {
                $gte: _.isSet(createdAtFrom)
                    ? createdAtFrom.concat(Consts.ISO_DATE)
                    : Consts.DATE_DEFAULT,
                $lt: _.isSet(createdAtTo)
                    ? createdAtTo.concat(Consts.ISO_DATE)
                    : new Date().toISOString(),
            }, updatedAt: {
                $gte: _.isSet(updatedAtFrom)
                    ? updatedAtFrom.concat(Consts.ISO_DATE)
                    : Consts.DATE_DEFAULT,
                $lte: _.isSet(updatedAtTo)
                    ? updatedAtTo.concat(Consts.ISO_DATE)
                    : new Date().toISOString(),
            } }),
    };
    // Add ids to where
    if ("ids" in query) {
        var idResult = ids.split(",");
        if (idResult) {
            _.assign(result.where, { _id: { $in: idResult } });
        }
    }
    return result;
};
exports.initialMongoQuery = initialMongoQuery;
//# sourceMappingURL=mongodb.js.map