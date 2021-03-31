import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
require("../utils/passport")(passport);

const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) res.send(err);
    });

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "10s",
    });
    console.log(token);
    return res.status(200).json({ token });
  })(req, res, next);
};

export default login;
