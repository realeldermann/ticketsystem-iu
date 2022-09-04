import { Types } from "mongoose";
import Type from "../../db/schemas/Type.schema";

export async function findTypeById(args: { _id: string }) { //gibt eine via ID gesuchte Art aus

    const type = await Type.findById({ _id: new Types.ObjectId(args._id) });     
    
    return type;
}