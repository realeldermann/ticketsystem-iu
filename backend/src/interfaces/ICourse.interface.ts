import { Types } from "mongoose";
import { IUser } from "./IUser.interface"

export interface ICourse {
    _id?: Types.ObjectId,
    name: string,
    tutor: Types.ObjectId | IUser
}