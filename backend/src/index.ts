import express from "express";
import serverless from "serverless-http";
import { connectDB } from "./middlewares";
import authRouter from "./routes/auth";
import dotenv from "dotenv";

dotenv.config();

const app = express();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret Key";

console.log("MONGO URI: ", process.env.MONGO_URI);

app.use(express.json());

app.use(connectDB(process.env.MONGO_URI));

app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello devil!!",
    });
});

app.use("/auth", authRouter);

app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

// app.listen(5000, () => {
//     console.log(`Example app listening`);
// });

export const handler = serverless(app);

// export default handler
