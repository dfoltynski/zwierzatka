import { Request, Response, NextFunction } from "express";

function isAuth(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.send("you are not auth");
}

export default isAuth;
