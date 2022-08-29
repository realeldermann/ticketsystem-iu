import { ISession } from "../../interfaces/ISession.interface";
import Session from "../../db/schemas/Session.schema";
import User from "../../db/schemas/User.schema";
import { Types } from "mongoose";

export async function checkSessionUser(args: {sessionToken: string}){
    const sessionUser = await Session.findOne({ token: args.sessionToken }, 'user -_id');
    console.log("Session User: " + sessionUser?.user)
    return sessionUser?.user
}

export async function checkSessionUserCourses(args: {sessionToken: string}){
    const sessionUser = await checkSessionUser({sessionToken: args.sessionToken})
    const sessionUserCourse = await User.findOne({  _id: new Types.ObjectId(sessionUser?._id)  }, 'course -_id');
    return sessionUserCourse?.course
}