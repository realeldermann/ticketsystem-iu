import { Types } from "mongoose";
import { IUser } from "./IUser.interface"

export interface ISession {
    _id?: Types.ObjectId,
    token: string,
    created: Date,
    expires: Date,
    user: Types.ObjectId | IUser,
}