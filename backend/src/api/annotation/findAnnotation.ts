import { Types } from "mongoose";
import Annotation from "../../db/schemas/Annotation.schema";

export async function findAnnotation(args: { _id: string }) { //gibt eine via ID gesuchte Annotation aus

    const annotation = await Annotation.findOne({ _id: new Types.ObjectId(args._id) });     
    
    return annotation;
}