import { Types } from "mongoose";
import { IUser } from "./IUser.interface"

export interface ITicket {
    _id?: Types.ObjectId,
    title: string,
    created: Date,
    status: boolean,
    text: string,
    course: string,
    user: Types.ObjectId | IUser
}