// Packages
import { Request, Response } from "express";

// Schema
import AuthorizationSchema from "./authorization.schema";

/**
 * TODO Create Middleware
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const signIn = (req: Request, res: Response, next: any) => {
  AuthorizationSchema.signIn
    .validateAsync(req.body)
    .then((_response) => next())
    .catch((err) => res.status(422).send(err));
};

/**
 * TODO Find Middleware
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const signUp = (req: Request, res: Response, next: any) => {
  AuthorizationSchema.signUp
    .validateAsync(req.body)
    .then((_response) => next())
    .catch((err) => res.status(422).send(err));
};
