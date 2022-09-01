import Type from "../../db/schemas/Type.schema";
import { Types } from "mongoose";

export async function deleteType(args: { _id: string }) { //löscht eine Art via ID

    await Type.findOneAndDelete({ _id: new Types.ObjectId(args._id) });     
        
    return true;
}