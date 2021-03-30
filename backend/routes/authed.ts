import express from "express";
import jwt from "jsonwebtoken";

import db from "../dbConfig";

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.headers.authorization.split(" ")[1]);
  res.json("git git??");
});

router.get("/user", (req, res) => {
  let owner = {
    name: "",
    birth: Date,
    gender: "",
    profile_picture: Buffer,
    pet: ([] as unknown) as [
      {
        pet_name: string;
        pet_birth: Date;
        pet_gender: string;
        pet_photo: Buffer;
      }
    ],
  };

  const token: null | { [key: string]: any } | string | any = jwt.decode(
    req.headers.authorization.split(" ")[1]
  );

  db.query(
    `SELECT Owner.owner_name, Owner.owner_birth, Owner.owner_gender, Owner.profile_picture, Pet.pet_name, Pet.pet_birth, Pet.breed, Pet.pet_gender, Pet.photo FROM Pet INNER JOIN Owner ON Pet.owner_ref=Owner.owner_id WHERE Owner.owner_id = ${token.id}`,
    (err, data) => {
      if (err) console.log(err);

      owner.name = data.rows[0].owner_name;

      owner.birth = data.rows[0].owner_birth;
      owner.gender = data.rows[0].owner_gender;
      owner.profile_picture = data.rows[0].profile_picture;

      data.rows.forEach((pet) => {
        owner.pet.push({
          pet_name: pet.pet_name,
          pet_birth: pet.pet_birth,
          pet_gender: pet.breed,
          pet_photo: pet.photo,
        });
      });

      console.log(owner);
      res.status(200).json(owner);
    }
  );
});

export default router;
