import express from "express";
import {
    getTestData,
    createOwner,
    passportLogin,
    authOk,
    authFail,
} from "../controllers";

const router = express.Router();

import isAuth from "../utils/auth";

router.get("/", getTestData);
router.get("/test-secret", isAuth, (req, res) => {
    res.send("treasure");
});

router.post("/owner/", createOwner);
router.post("/login/", passportLogin);

router.get("/authok/", authOk);
router.get("/authfail/", authFail);

export default router;
