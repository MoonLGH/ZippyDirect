import * as Express from "express";
import {parse} from "../../util/zippy.js";
const indexRouter = Express.Router();

indexRouter.get("/", function(req:Express.Request, res:Express.Response) {
  if (req.query.link) {
    parse((req.query.link as string)).then((obj) =>{
      res.redirect(obj.link);
    }).catch(() =>{
      res.redirect("/");
    });
  } else {
    res.render("index");
  }
});

export {indexRouter};
