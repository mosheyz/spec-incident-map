import express from "express";
import connectToMongo from "./db/db.js";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import incidentRouter from "./routes/incidents.routes.js";
import { errorHandler } from "./utils/errorHandler.js";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/incidents", incidentRouter);

app.use(errorHandler);

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectToMongo();

    httpServer.listen(PORT, () =>
        console.log(`server listening on port ${PORT}`),
    );
};

startServer();
