import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json("git git??");
});

export default router;
