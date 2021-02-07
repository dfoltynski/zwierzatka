import express from "express";
import {
    getTestData,
    createOwner,
    passportLogin,
    authOk,
    authFail,
    createPet,
} from "../controllers";

const router = express.Router();

import isAuth from "../utils/auth";

router.get("/", getTestData);
router.get("/test-secret", isAuth, (req, res) => {
    res.send("treasure");
});

router.post("/owner/", createOwner);
router.post("/login/", passportLogin);

router.post("/pet/", createPet);

router.get("/authok/", authOk);
router.get("/authfail/", authFail);

export default router;
