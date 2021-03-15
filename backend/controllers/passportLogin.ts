import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import * as passportLocal from "passport-local";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../dbConfig";

const LocalStrategy = passportLocal.Strategy;

interface Owner {
  id: number;
  email: string;
  password: string;
}

// passport.use(new LocalStrategy({usernameField:'email'}))

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const query = `SELECT owner_id, email, password FROM Owner WHERE email LIKE '${email}'`;

    let ownerObject: Owner = { id: 0, email: "", password: "" };

    db.query(query, (err, data) => {
      if (err) throw err;
      data.rows.forEach((owner) => {
        console.log(owner.id, owner.email, owner.password);

        ownerObject.id = owner.owner_id;
        ownerObject.email = owner.email;
        ownerObject.password = owner.password;
      });

      (async () => {
        if (!ownerObject.email) {
          console.log("Incorrect email");

          return done(null, false, {
            message: "Incorrect email.",
          });
        }

        if (!(await bcrypt.compare(password, ownerObject.password))) {
          console.log("Incorrect password");
          return done(null, false, {
            message: "Incorrect password.",
          });
        }

        return done(null, ownerObject);
      })();
    });
  })
);

passport.serializeUser((user: Owner, done) => {
  // console.log("serialize: ", user);

  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserialize2: ", id);
  db.query(`SELECT * FROM Owner WHERE owner_id='${id}'`, (err, data) => {
    // console.log(data.rows);

    done(err, data.rows);
  });
});

const passportLogin = (req: Request, res: Response, next: NextFunction) => {
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

    const token = jwt.sign(user, process.env.SECRET);
    console.log(token);
    return res.json({ user, token });
  })(req, res);
  // passport.authenticate("local", {
  //   successRedirect: "/v1/authok",
  //   failureRedirect: "/v1/authfail",
  // })(req, res, next);
  // res.send("auth ok");
  // res.redirect("/v1/test-secret");
};

export default passportLogin;
