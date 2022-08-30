import { Types } from "mongoose";
import Course from "../../db/schemas/Course.schema";

export async function findCourseTutor(args: { _id: string }) { //gibt den Tutor eines Kurses via ID aus
    const course = await Course.findOne({ _id: new Types.ObjectId(args._id) });     
    console.log("Tutor: " + course?.tutor)

    return course?.tutor;
}

export async function findCourse(args: { _id: string }) { //gibt einen via ID gesuchten Kurs aus

    const course = await Course.findOne({ _id: new Types.ObjectId(args._id) });     
    
    return course;
}

