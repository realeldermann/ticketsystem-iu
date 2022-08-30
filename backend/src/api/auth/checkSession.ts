import { ISession } from "../../interfaces/ISession.interface";
import Session from "../../db/schemas/Session.schema";
import User from "../../db/schemas/User.schema";
import { Types } from "mongoose";
import { findCourseTutor, findTutorCourseId } from "../course/findCourse";

export async function checkSessionUser(args: {sessionToken: string}){ //überprüft den User aus der Session
    const sessionUserId = await Session.findOne({ token: args.sessionToken }, 'user -_id');
    console.log("Session User: " + sessionUserId?.user)

    return sessionUserId?.user
}

export async function checkSessionUserIsAdmin(args: {sessionToken: string}){ //überprüft ob der User aus der Session ein Admin ist
    const sessionUserId = await checkSessionUser({ sessionToken: args.sessionToken });
    const sessionUser = await User.findOne({ _id: new Types.ObjectId(sessionUserId?._id) } )
    console.log("User is Admin?: " + sessionUser?.admin)
        if (sessionUser?.admin == true) {
            return true
        } else {
            return false
        }
}

export async function checkSessionUserCourses(args: {sessionToken: string}){ //überprüft welche Kurse der User aus der Session hat
    const sessionUser = await checkSessionUser({sessionToken: args.sessionToken})
    const sessionUserCourse = await User.findOne({  _id: new Types.ObjectId(sessionUser?._id)  }, 'course -_id')
    console.log("User Course: " + sessionUserCourse?.course)

    return sessionUserCourse?.course
}

export async function checkSessionCourseTutor(args: {sessionToken: string}) { //gibt die Kurs id eines Tutor aus
    const sessionUserId = await checkSessionUser({ sessionToken: args.sessionToken });
        if (sessionUserId != null) {
            let sessionUserIdString = sessionUserId.toString()
            const sessionTutorCourseId = await findTutorCourseId({tutor: sessionUserIdString});
                if (sessionTutorCourseId != undefined) {
                    let sessionTutorCourseIdString = sessionTutorCourseId.toString()
                    const courseTutor = await findCourseTutor({_id: sessionTutorCourseIdString})
                    console.log("Kurs Tutor: " + courseTutor)
                    return courseTutor
                } else {
                    return null
                }
        } else {
            return null
        }
}