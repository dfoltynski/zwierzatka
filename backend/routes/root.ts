import express from "express";
import {
  getTestData,
  createOwner,
  login,
  authOk,
  authFail,
  createPet,
  getBasicPetData,
} from "../controllers";

const router = express.Router();

router.get("/", getTestData);

router.post("/owner/", createOwner);

router.post("/login/", login);

router.post("/pet/", createPet);
router.get("/pet/", getBasicPetData);

router.get("/authok/", authOk);
router.get("/authfail/", authFail);

export default router;
