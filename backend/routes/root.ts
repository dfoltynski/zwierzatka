import express from "express";
import { getTestData, createOwner, passportLogin } from "../controllers";
// import * as passport from "passport";
import isAuth from "../utils/auth";
const router = express.Router();

router.get("/", getTestData);

router.post("/owner/", createOwner);
router.post("/login/", passportLogin);

router.get("/authok/", (req, res) => {
    console.log(req);

    res.send("auth ok");
    // res.status(200);
});

router.get("/authfail/", (req, res) => {
    res.send("auth fail");
    // res.status(400);
});

router.get("/test-secret", isAuth, (req, res) => {
    res.send("treasure");
});

export default router;
