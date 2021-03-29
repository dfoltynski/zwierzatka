import express from "express";

import db from "../dbConfig";

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.headers.authorization.split(" ")[1]);
  res.json("git git??");
});

router.get("/user", (req, res) => {
  // db.query(`SELECT * FROM Owner WHERE owner_id = ${req.body.id}`);
});

export default router;
