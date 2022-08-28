import { ISession } from "../../interfaces/ISession.interface";
import Session from "../../db/schemas/Session.schema";
import User from "../../db/schemas/User.schema";
import { Types } from "mongoose";

export async function checkSessionUser(args: {sessionToken: string}){
    const sessionUser = await Session.find({ token: args.sessionToken }, 'user -_id');
    let sessionUserString = JSON.stringify(sessionUser);
    sessionUserString = sessionUserString.replace('[{"user":"', '')
    sessionUserString = sessionUserString.replace('"}]', '')
    return sessionUserString
}

export async function checkSessionUserCourses(args: {sessionToken: string}){
    const sessionUser = await checkSessionUser({sessionToken: args.sessionToken})
    const sessionUserCourse = await User.find({  _id: new Types.ObjectId(sessionUser)  }, 'course -_id');
    let sessionUserCourseString = JSON.stringify(sessionUserCourse);
    sessionUserCourseString = sessionUserCourseString.replace('[{"course":"', '')
    sessionUserCourseString = sessionUserCourseString.replace('"}]', '')
    return sessionUserCourseString
}