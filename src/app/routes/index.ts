import * as Express from "express";

const indexRouter = Express.Router();

indexRouter.get("/", function(req:Express.Request, res:Express.Response) {
  res.render("index");
});

export {indexRouter};
