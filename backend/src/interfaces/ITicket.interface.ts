import { Types } from "mongoose";
import { IUser } from "./IUser.interface"
import { ICourse } from "./ICourse.interface";
import { ICategorie } from "./ICategorie.interface";

export interface ITicket {
    _id?: Types.ObjectId,
    title: string,
    created: Date,
    status: boolean,
    priority: number,
    text: string,
    categorie: Types.ObjectId | ICategorie,
    course: Types.ObjectId | ICourse,
    user: Types.ObjectId | IUser
}