import { Resolver } from "dns";
import { Request, Response } from "express";
import session from "express-session";

import db from "../dbConfig";

declare module "express-session" {
    interface Session {
        passport: {
            user: number;
        };
    }
}

const getBasicPetData = (req: Request, res: Response) => {
    const USER_ID: number = req.session.passport.user;

    const petData: Array<Object> = [];

    const query = `SELECT Pet.photo, Pet.pet_name, Pet.pet_birth, Pet.breed, Pet.weight FROM Pet WHERE Pet.owner_ref='${USER_ID}';`;

    db.query(query, (err, data) => {
        if (err) throw err;

        data.rows.forEach((pet) => {
            petData.push({
                photo: pet.photo,
                pet_name: pet.pet_name,
                pet_birth: pet.pet_birth,
                breed: pet.breed,
                weight: pet.weight,
            });
        });
        res.json(petData);
    });
    res.status(200);
};

export default getBasicPetData;
