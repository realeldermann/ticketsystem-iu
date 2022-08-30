import { Types } from "mongoose";
import { IUser } from "./IUser.interface"

export interface IAnnotation {
    _id?: Types.ObjectId,
    created: Date,
    text: string,
    user: Types.ObjectId | IUser
}