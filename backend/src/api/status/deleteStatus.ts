import Status from "../../db/schemas/Status.schema";
import { Types } from "mongoose";

export async function deleteStatus(args: { _id: string }) { //löscht einen Status via ID

    await Status.findOneAndDelete({ _id: new Types.ObjectId(args._id) });     
        
    return true;
}