import { model, Schema } from "mongoose";
import { IUser } from "../../interfaces/IUser.interface";

const userSchema = new Schema<IUser>({
    name: String,
    email: String,
    passwordHash: String,
    passwordSalt: String,
    created: Date
});

const User = model<IUser>('User', userSchema);
export default User;