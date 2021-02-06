import express, { Request, Response } from "express";
import bcrypt, { hash } from "bcrypt";
import db from "../dbConfig";

const createOwner = (req: Request, res: Response) => {
    const { email, password, name, birth } = req.body;
    (async () => {
        try {
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(password, salt);

            const query = `INSERT INTO Owner (email, password, owner_name, owner_birth) VALUES ('${email}', '${hashedPassword}', '${name}', '${birth}')`;

            db.query(query, (err, results) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(results.rows);
                    res.send("account created").status(200);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    })();
};

export default createOwner;
