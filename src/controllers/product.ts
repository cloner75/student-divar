// Packages
import * as _ from "lodash";
import { Request, Response } from "express";

// Models
import ProductModel from "../models/product";



// Consts
enum Consts {
  PERFIX = 'product'
}

/**
 * TODO Conversation Controller
 */
class Product {
  /**
   * TODO Constructor
   */
  constructor() { }

  /**
   * TODO Create Controller
   * @param {request} req
   * @param {response} res
   */
  async create(req: any, res: Response) {
    try {
      const created: any = await ProductModel.create({ ...req.body, userId: req.user._id });
      return res.send({ success: true, created });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  /**
   * TODO Update Controller
   * @param {request} req
   * @param {response} res
   */
  async update(req: Request, res: Response) {
    try {
      const _id = req.params.id;
      const updated: any = await ProductModel.findOneAndUpdate({ _id }, { $set: req.body }, { new: true });
      return res.send({ success: true, updated });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
  /**
   * TODO Delete Controller
   * @param {request} req
   * @param {response} res
   */
  async delete(req: Request, res: Response) {
    try {
      const deleted: any = await ProductModel.deleteOne({ _id: req.params.id });
      return res.send({ success: true, deleted });
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  /**
   * TODO Find Controller
   * @param {request} req
   * @param {response} res
   */
  async find(req: Request, res: Response) {
    try {
      const products: any = await ProductModel.find(req.query).sort({ onTop: 'desc' });
      return res.send({ success: true, data: products });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  /**
   * TODO Find One Controller
   * @param {request} req
   * @param {response} res
   */
  async findOne(req: Request, res: Response) {
    try {
      return res.send({ success: true });
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  /**
   * TODO Search Controller
   * @param {request} req
   * @param {response} res
   */
  async search(req: any, res: Response) {
    try {
      let { title, priceMin, priceMax, categoryId, cityId, type } = req.query;
      let searchBox: any = {
        status: { $ne: 0 },
        price: {
          $gte: +(priceMin - ((priceMin * 5) / 100)) || 0,
          $lte: +(+priceMax + ((+priceMax * 5) / 100)) || 50000000000,
        }
      };
      if (categoryId) {
        Object.assign(searchBox, { categoryId });
      }
      if (cityId) {
        Object.assign(searchBox, { cityId });
      }
      if (type) {
        Object.assign(searchBox, { type });
      }

      if (title) {
        Object.assign(searchBox, {
          title: { $regex: new RegExp('.*' + title + '.*', "i") }
        });
      }
      const getProduct = await ProductModel.find(searchBox).sort({ onTop: 'desc' });
      return res.send({ success: true, data: getProduct });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

export default Product;