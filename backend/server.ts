import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import * as passportJWT from "passport-jwt";

import { router, authed } from "./routes";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(process.env.SECRET),
    },
    (payload, cb) => {
      return cb(null, payload);
    }
  )
);

dotenv.config();

class Server {
  private app;

  constructor() {
    this.app = express();

    this.middlewares();
    this.app.use("/v1", router);
    this.app.use(
      "/authed",
      passport.authenticate("jwt", { session: false }),
      authed
    );
  }

  private middlewares() {
    // if (this.app.get("env") === "production") {
    // this.app.set("trust proxy", 1); // trust first proxy
    // session.cookie.secure = true; // serve secure cookies
    // }

    this.app.use(morgan("dev"));
    this.app.use(express.json());

    this.app.use(
      session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 3600000 }, // 1 hour
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500);
        res.send("Oops, something went wrong 😿");
      }
    );
    // this.app.use(cors());
    // this.app.use(helmet());
  }

  public start(port: number) {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  }
}

export default Server;
