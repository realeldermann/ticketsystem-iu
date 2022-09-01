import { Types } from "mongoose";
import { IUser } from "./IUser.interface"
import { ICourse } from "./ICourse.interface";
import { ICategorie } from "./ICategorie.interface";
import { IAnnotation } from "./IAnnotation.interface";
import { IType } from "./IType.interface";

export interface ITicket {
    _id?: Types.ObjectId,
    title: string,
    created: Date,
    status: number,
    priority: number,
    text: string,
    categorie: Types.ObjectId | ICategorie,
    course: Types.ObjectId | ICourse,
    user: Types.ObjectId | IUser
    annotation: Types.ObjectId | IAnnotation
    type: Types.ObjectId | IType
}