// Packages
import { any } from 'joi';
import * as _ from "lodash";

// Configs
import config from "./../configs/";

// CONSTS
enum Consts {
  ORDER_DEFAULT = -1,
  CREATED_AT = "createdAt",
  LIMIT_DEFAULT = 10,
  SKIP_DEFAULT = 1,
  PAGE_DEFAULT = 1,
  DATE_DEFAULT = "2017-01-01T01:00:00.000Z",
  ISO_DATE = "T01:00:00.000Z",
  ASC = "asc",
}
const defaultFields = config.defaultFields;

/**
 * TODO select allow fields
 * @param {string} fields
 * @returns {string} allowFields
 */
export const selectAllowFields = (fields, model = "user") => {
  let result = "";
  for (let item of fields.split(",")) {
    if (defaultFields[model].includes(item)) {
      result += `${item} `;
    }
  }
  return result;
};

/**
 * TODO initial option and where query
 * @param {object} query
 * @return {object} option
 * @return {object} where
 */
export const initialMongoQuery = (query, model = "user") => {
  const that = module.exports;
  const { fields, limit, skip, sort, order, page, ids, ...where } = query;
  const {
    createdAtFrom,
    createdAtTo,
    updatedAtFrom,
    updatedAtTo,
    ...rest
  } = where;

  const result = {
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
    where: {
      ...rest,
      createdAt: {
        $gte: _.isSet(createdAtFrom)
          ? createdAtFrom.concat(Consts.ISO_DATE)
          : Consts.DATE_DEFAULT,
        $lt: _.isSet(createdAtTo)
          ? createdAtTo.concat(Consts.ISO_DATE)
          : new Date().toISOString(),
      },
      updatedAt: {
        $gte: _.isSet(updatedAtFrom)
          ? updatedAtFrom.concat(Consts.ISO_DATE)
          : Consts.DATE_DEFAULT,
        $lte: _.isSet(updatedAtTo)
          ? updatedAtTo.concat(Consts.ISO_DATE)
          : new Date().toISOString(),
      },
    },
  };
  // Add ids to where
  if ("ids" in query) {
    const idResult = ids.split(",");
    if (idResult) {
      _.assign(result.where, { _id: { $in: idResult } });
    }
  }
  return result;
};
