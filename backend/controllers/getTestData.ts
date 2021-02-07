import express from "express";
import { idText } from "typescript";
import db from "../dbConfig";

interface Owner {
    name: string;
    pet_name: string;
}

const welcome = (req: express.Request, res: express.Response) => {
    let ownerObject: Owner = { name: "", pet_name: "" };
    db.query(
        "SELECT Owner.owner_name, Pet.pet_name FROM Pet INNER JOIN Owner ON Pet.owner_ref=Owner.owner_id WHERE Owner.email LIKE 'teset@test.com';",
        (err, data) => {
            if (err) throw err;
            data.rows.forEach((owner) => {
                console.log(owner);

                ownerObject.name = owner.owner_name;
                ownerObject.pet_name = owner.pet_name;
            });

            res.json(ownerObject);
        }
    );
    res.status(200);
};

export default welcome;
