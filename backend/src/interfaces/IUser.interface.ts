import { Types } from "mongoose";
import { ICourse } from "./ICourse.interface";

export interface IUser {
    _id?: Types.ObjectId,
    name?: string,
    email: string,
    passwordHash?: string,
    passwordSalt?: string,
    created: Date
    course: Types.ObjectId | ICourse,
}