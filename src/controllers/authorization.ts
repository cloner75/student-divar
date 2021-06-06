// Packages
import * as _ from "lodash";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

// Models
import UserModel from "./../models/user";

// Helper
import { signator } from './../helpers/jwt';

// Consts
enum Consts {
  name = "user",
  saltRounds = 10
}

/**
 * TODO Conversation Controller
 */
class Authorization {
  /**
   * TODO Constructor
   */
  constructor() { }

  /**
   * TODO Root Controller
   * @param {request} req
   * @param {response} res
   */
  async signIn(req: Request, res: Response) {
    try {
      const { email, password: passwordInput } = req.body;
      const checkUser: any = await UserModel.findOne({ email });
      if (!checkUser || !compareSync(passwordInput, checkUser.password)) {
        return res.sendStatus(404);
      }
      const { password, ...rest } = checkUser.toObject();
      const token = signator(rest);
      // const token = jwt.sign(rest, process.env.SECRET_KEY_JWT, {
      //     expiresIn: "24h",
      // });
      return res.send({ success: true, token });
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  /**
   * TODO Find One Controller
   * @param {request} req
   * @param {response} res
   */
  async signUp(req: Request, res: Response) {
    try {
      const { password: passwordInput, email } = req.body;
      console.log({ email });
      const checkUser = await UserModel.findOne({ email });
      if (checkUser) {
        return res.status(408).send({ success: false, message: 'duplicated' });
      }
      const salt = await genSaltSync(Consts.saltRounds);
      const hash = await hashSync(passwordInput, salt);
      const register: any = await UserModel.create({ email, password: hash });
      const { password, ...rest } = register.toObject();
      return res.status(200).send({ token: signator(rest) });
    } catch (err) {
      console.log('signUp', err.message);
      return res.status(500).send(err.message);
    }
  }

  /**
   * TODO Find One Controller
   * @param {request} req
   * @param {response} res
   */
  async find(req: Request, res: Response) {
    try {
      const checkUser: any = await UserModel.findOne({ _id: req.params.id });
      if (!checkUser) {
        return res.status(404).send({ success: false, message: 'not found' });
      }
      delete checkUser.password;
      return res.status(200).send({ success: true, data: checkUser });
    } catch (err) {
      console.log('signUp', err.message);
      return res.status(500).send(err.message);
    }
  }
}

export default Authorization;