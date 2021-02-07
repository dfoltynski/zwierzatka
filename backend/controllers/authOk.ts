import { Request, Response } from "express";

const authOk = (req: Request, res: Response) => {
    res.send("auth ok");
};

export default authOk;
