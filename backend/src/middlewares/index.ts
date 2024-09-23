import connectMongoDB from "../connection";
import { NextFunction, Request, Response } from "express";

export const connectDB = (uri: string | undefined) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await connectMongoDB(uri ?? "");
        next();
    };
};
