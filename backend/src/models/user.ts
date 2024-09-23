import { IUser } from "../types";
import mongoose from "mongoose";

const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model("user", UserSchema);
