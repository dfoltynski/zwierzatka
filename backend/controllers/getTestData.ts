import express from "express";
import { idText } from "typescript";
import db from "../dbConfig";

interface Owner {
    email: string;
    password: string;
}

const welcome = (req: express.Request, res: express.Response) => {
    let ownerObject: Owner = { email: "", password: "" };
    db.query(
        "SELECT email, password FROM Owner WHERE email LIKE 'robert@robert.com'",
        (err, data) => {
            if (err) throw err;
            data.rows.forEach((owner) => {
                // console.log(owner.email, owner.password);

                ownerObject.email = owner.email;
                ownerObject.password = owner.password;
            });

            if (!ownerObject.email) {
            }

            res.json(ownerObject);
        }
    );
    res.status(200);
};

export default welcome;
