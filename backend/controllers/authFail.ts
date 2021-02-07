import { Request, Response } from "express";

const authFail = (req: Request, res: Response) => {
    res.send("auth fail");
    res.status(400);
};

export default authFail;
