import User from "../../db/schemas/User.schema";
//import { pubsub } from "../api";
import { generateRandomString, generateSalt, hashPassword } from "./cryptoUtils";

export async function registrationHandler(args: { registrationInput: { email: string, password: string, name: string, firstname: string, course: string } }) { //erstellt neuen User
    const existingUser = await User.findOne({ email: args.registrationInput.email });
    
    if(existingUser) {
        return new Error('E-Mail already in use');
    }

    else {
        const salt = generateSalt();
        const hash = hashPassword(args.registrationInput.password, salt);          
       
        const user = new User({
            name: args.registrationInput.name,
            firstname: args.registrationInput.firstname,
            passwordSalt: salt,
            passwordHash: hash,
            email: args.registrationInput.email,
            course: args.registrationInput.course,
            created: new Date(),
        });
    
        await user.save();
    }

    return true
}