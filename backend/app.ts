import dotenv from "dotenv";

import server from "./server";

dotenv.config();

const port = parseInt(process.env.SERVER_PORT);

const startServer = new server()
    .start(port)
    .then((port) => console.log(`Server is listening on ${port}`))
    .catch((err) => console.log(err));

export default startServer;
