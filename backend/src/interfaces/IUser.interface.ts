import { Types } from "mongoose";

export interface IUser {
    _id?: Types.ObjectId,
    name?: string,
    email: string,
    passwordHash?: string,
    passwordSalt?: string,
    created: Date
}