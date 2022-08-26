import Session from "../../db/schemas/Session.schema";
import User from "../../db/schemas/User.schema";
import { generateRandomString, hashPassword } from "./cryptoUtils";

export async function loginHandler(args: { email: string, password: string }) {
    const user = await User.findOne({ email: args.email });
    const hashedInput = hashPassword(args.password, user && user.passwordSalt ? user.passwordSalt : '');

    if(!user || hashedInput !== user.passwordHash) {
        throw new Error('Wrong email or password');
    } else {
        try {
            const session = await (new Session({
                token: generateRandomString(32),
                created: new Date(),
                // expires: new Date(Date.now() + 30*24*3600),
                user: user._id           
            })).save();

            return session.token;
        } catch(e) {
            console.error(e);
            throw new Error('Internal server error');
        }
    }
}