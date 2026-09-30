import express from "express";
import connectToMongo from "./db/db.js";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectToMongo();

    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
};

startServer();
