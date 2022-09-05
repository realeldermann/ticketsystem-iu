import Priority from "../../db/schemas/Priority.schema";
import { Types } from "mongoose";

export async function deletePriority(args: { _id: string }) { //löscht eine Priorität via ID

    await Priority.findOneAndDelete({ _id: new Types.ObjectId(args._id) });     
        
    return true;
}