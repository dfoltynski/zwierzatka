import express, { Request, Response } from "express";

import db from "../dbConfig";
import randomizePetName from "../utils/tmp/randomizePetName";
import randomizePetBirth from "../utils/tmp/randomizePetBirth";
import randomizePetBreed from "../utils/tmp/randomizePetBreed";
import randomizePetGender from "../utils/tmp/randomizePetGender";
import randomizePetPhoto from "../utils/tmp/randomizePetPhoto";
// import randomizeOwnerRef from "../utils/tmp/randomizeOwnerRef";

const createOwner = (req: Request, res: Response) => {
    let {
        name,
        birth,
        breed,
        gender,
        color,
        photo,
        owner_ref,
        weight,
    } = req.body;
    (async () => {
        try {
            name = randomizePetName();
            birth = randomizePetBirth(new Date(2012, 0, 1), new Date());
            breed = randomizePetBreed();
            gender = randomizePetGender();
            photo = await randomizePetPhoto();
            // owner_ref = randomizeOwnerRef();

            const query = `INSERT INTO Pet (pet_name, pet_birth, breed, pet_gender, color, photo, owner_ref, weight) VALUES ('${name}', '${birth}', '${breed}', '${gender}', '${color}', '${
                photo || null
            }', '${owner_ref}', '${weight}')`;

            console.log(query);

            db.query(query, (err, results) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(results.rows);
                    res.send("pet created").status(200);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    })();
};

export default createOwner;
