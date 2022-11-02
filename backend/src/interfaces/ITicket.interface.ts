import { Types } from "mongoose";
import { IUser } from "./IUser.interface"
import { ICourse } from "./ICourse.interface";
import { ICategorie } from "./ICategorie.interface";
import { IAnnotation } from "./IAnnotation.interface";
import { IType } from "./IType.interface";
import { IPriority } from "./IPriority.interface";
import { IStatus } from "./IStatus.interface";

export interface ITicket {
    _id?: Types.ObjectId,
    id: Number,
    title: string,
    created: Date,
    status: Types.ObjectId | IStatus,
    priority: Types.ObjectId | IPriority,
    text: string,
    categorie: Types.ObjectId | ICategorie,
    course: Types.ObjectId | ICourse,
    user: Types.ObjectId | IUser,
    annotation: Types.ObjectId | IAnnotation,
    type: Types.ObjectId | IType
}