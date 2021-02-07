import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import * as passportLocal from "passport-local";
import bcrypt from "bcrypt";

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

passport.serializeUser((user, done) => {
    // console.log("serialize: ", user);

    done(null, user);
});

passport.deserializeUser((user: Owner, done) => {
    // console.log("deserialize: ", user.id);
    db.query(`SELECT * FROM Owner WHERE owner_id='${user.id}'`, (err, data) => {
        // console.log(data.rows);

        done(err, data);
    });
});

const passportLogin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", {
        successRedirect: "/v1/authok",
        failureRedirect: "/v1/authfail",
    })(req, res, next);
    // res.send("auth ok");
    // res.redirect("/v1/test-secret");
};

export default passportLogin;
