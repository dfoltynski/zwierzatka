import express from "express";
import { getTestData, createOwner } from "../controllers";

const router = express.Router();

router.get("/", getTestData);

router.post("/owner/", createOwner);

export default router;
