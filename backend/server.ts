import morgan from "morgan";
import express from "express";
import { router } from "./routes";

class Server {
    private app;

    constructor() {
        this.app = express();

        this.middlewares();
        this.app.use("/v1", router);
    }

    private middlewares() {
        this.app.use(morgan("dev"));
    }

    public start(port: number) {
        return new Promise((resolve, reject) => {
            this.app
                .listen(port, () => {
                    resolve(port);
                })
                .on("error", (err: Object) => reject(err));
        });
    }
}

export default Server;
