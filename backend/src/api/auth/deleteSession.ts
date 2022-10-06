import Session from "../../db/schemas/Session.schema";
import { Types } from "mongoose";

export async function deleteSession(args: {sessionToken: string}) { //löscht eine Session
    let sessionTokenString = args.sessionToken.toString()
    console.log(sessionTokenString)
    await Session.findOneAndDelete({token: sessionTokenString});     
        
    return true;
}