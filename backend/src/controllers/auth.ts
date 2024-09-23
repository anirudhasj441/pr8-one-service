import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { IUser } from "../types";
import { JWT_SECRET_KEY } from "..";

export const registerUser = async (req: Request, res: Response) => {
    let data = req.body;
    let username = data.username;

    let password = await bcrypt.hash(data.password, 10);

    try {
        let result = await User.create({
            username: username,
            password: password,
        });
        res.status(201).json({
            msg: "user created successfully",
        });
    } catch (e) {
        res.status(409).json({
            msg: "db error: " + String(e),
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        let user: IUser | null = await User.findOne({
            username: data.username,
        });
        if (!user) {
            return res.status(401).json({
                msg: "Invalid credentials",
            });
        }

        let passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            res.status(401).json({
                msg: "Invalid credentials",
            });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);
        res.status(200).json({
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Login Failed" + String(error),
        });
    }
};
