// Pacjages
import * as Joi from "joi";

// Consts
import configs from "./../configs/index";
const messages = {
  "any.required": configs.errors[1],
  "object.unknown": configs.errors[1],
  "array.base": configs.errors[2],
  "string.base": configs.errors[2],
  "string.pattern.base": configs.errors[2],
  "any.only": configs.errors[2],
  "string.empty": configs.errors[10],
  "string.min": configs.errors[11],
  "string.max": configs.errors[12],
};

// Schemas
export default {
  /**
   * TODO Export Schema Create
   */
  signIn: Joi.object({
    email: Joi.string().trim().required().messages(messages),
    password: Joi.string().trim().required().messages(messages),
  }),

  /**
   * TODO Export Schema Find
   */
  signUp: Joi.object({
    // username: Joi.string().trim().required().messages(messages),
    email: Joi.string().trim().email().required().messages(messages),
    password: Joi.string().trim().required().messages(messages),
  }),
};
