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

export async function findTutorCourse(args: { tutor: string }) { //gibt den Kurs eines Tutor aus
    const course = await Course.findOne({ tutor: args.tutor });     
    console.log("Tutor: " + course)

    return course;
}

export async function findTutorCourseId(args: { tutor: string }) { //gibt die Kurs id eines Tutor aus
    const course = await Course.findOne({ tutor: args.tutor });     
    console.log("Kurs id: " + course?._id)

    return course?._id;
}
