import { ISession } from "../../interfaces/ISession.interface";
import Session from "../../db/schemas/Session.schema";

export async function checkSession(args: {sessionToken: string}){
    const sessionUser = await Session.find({ token: args.sessionToken }, 'user -_id');
    let sessionUserString = JSON.stringify(sessionUser);
    sessionUserString = sessionUserString.replace('[{"user":"', '')
    sessionUserString = sessionUserString.replace('"}]', '')
    return sessionUserString
}