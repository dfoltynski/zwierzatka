import express from "express";
import db from "../dbConfig";

const welcome = (req: express.Request, res: express.Response) => {
    db.query(
        "SELECT Owner.owner_name, Pet.pet_name, Pet.pet_birth FROM Pet INNER JOIN Owner ON Pet.owner_ref=Owner.owner_id",
        (err, data) => {
            if (err) throw err;
            res.json(data.rows);
        }
    );
};

export default welcome;
