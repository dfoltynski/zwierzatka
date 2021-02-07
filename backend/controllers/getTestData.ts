import express from "express";
import db from "../dbConfig";

const welcome = (req: express.Request, res: express.Response) => {
    let ownerObject = { name: "", pet_name: [] as string[] };
    const { email } = req.body;
    db.query(
        `SELECT Owner.owner_name, Pet.pet_name FROM Pet INNER JOIN Owner ON Pet.owner_ref=Owner.owner_id WHERE Owner.email LIKE '${email}';`,
        (err, data) => {
            if (err) throw err;

            ownerObject.name = data.rows[0].owner_name;
            data.rows.forEach((owner) => {
                ownerObject.pet_name.push(owner.pet_name);
            });

            res.json(ownerObject);
        }
    );
    res.status(200);
};

export default welcome;
