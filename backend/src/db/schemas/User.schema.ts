import { model, Schema } from "mongoose";
import { IUser } from "../../interfaces/IUser.interface";

const userSchema = new Schema<IUser>({
    name: String,
    firstname: String,
    email: String,
    passwordHash: String,
    passwordSalt: String,
    created: Date,
    admin: Boolean,
    course: { type: 'ObjectId', ref: 'Course' },
});

const User = model<IUser>('User', userSchema);
export default User;