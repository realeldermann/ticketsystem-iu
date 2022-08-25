import { model, Schema } from "mongoose";
import { ISession } from "../../interfaces/ISession.interface";

const sessionSchema = new Schema<ISession>({
    token: String,
    created: Date,
    expires: Date,
    user: { type: 'ObjectId', ref: 'User' },
});

const Session = model<ISession>('Session', sessionSchema);
export default Session;