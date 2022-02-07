import * as Express from "express";
import {parse} from "../../util/zippy.js";
const APIRouter = Express.Router();

APIRouter.get("/get", function(req:Express.Request, res:Express.Response) {
  const {link} = req.query;

  parse((link as string)).then(res.status(200).send.bind(res)).catch((err) =>{
    res.status(500).send(err);
  });
});

export {APIRouter};
