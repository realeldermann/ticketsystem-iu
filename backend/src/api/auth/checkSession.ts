import { ISession } from "../../interfaces/ISession.interface";
import Session from "../../db/schemas/Session.schema";
import User from "../../db/schemas/User.schema";
import { Types } from "mongoose";

export async function checkSessionUser(args: {sessionToken: string}){
    const sessionUserId = await Session.findOne({ token: args.sessionToken }, 'user -_id');
    console.log("Session User: " + sessionUserId?.user)
    return sessionUserId?.user
}

export async function checkSessionUserIsAdmin(args: {sessionToken: string}){
    const sessionUserId = await checkSessionUser({ sessionToken: args.sessionToken });
    const sessionUser = await User.findOne({ _id: new Types.ObjectId(sessionUserId?._id) } )
    console.log("User is Admin?: " + sessionUser?.admin)
        if (sessionUser?.admin == true) {
            return true
        } else {
            return false
        }
}

export async function checkSessionUserCourses(args: {sessionToken: string}){
    const sessionUser = await checkSessionUser({sessionToken: args.sessionToken})
    const sessionUserCourse = await User.findOne({  _id: new Types.ObjectId(sessionUser?._id)  }, 'course -_id')
    console.log("User Course: " + sessionUserCourse?.course)
    return sessionUserCourse?.course
}