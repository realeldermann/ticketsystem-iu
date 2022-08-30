import Course from "../../db/schemas/Course.schema";
import { Types } from "mongoose";

export async function deleteCourse(args: { _id: string }) { //löscht einen Kurs via ID

    await Course.findOneAndDelete({ _id: new Types.ObjectId(args._id) });     
        
    return true;
}