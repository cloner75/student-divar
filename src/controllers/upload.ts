// Packages
import * as _ from "lodash";
import { Request, Response } from "express";

// Models
import UploadModel from "../models/upload";

// Helper
import { signator } from './../helpers/jwt';

// Consts
enum Consts {
    PERFIX = 'upload'
}

/**
 * TODO Conversation Controller
 */
class Upload {
    /**
     * TODO Constructor
     */
    constructor() { }

    /**
     * TODO Create Controller
     * @param {request} req
     * @param {response} res
     */
    async create(req: Request, res: Response) {
        try {
            const created: any = await UploadModel.create(req.body);
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
            const updated: any = await UploadModel.findOneAndUpdate({ _id }, { $set: req.body }, { new: true });
            return res.send({ success: true, updated });
        } catch (err) {
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
            const deleted: any = await UploadModel.deleteOne({ _id: req.params.id });
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
            // const {} = ta inja
            return res.send({ success: true });
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
}

export default Upload;