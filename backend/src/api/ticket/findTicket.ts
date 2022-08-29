import Ticket from "../../db/schemas/Ticket.schema";
import { Types } from "mongoose";
import { checkSessionUser, checkSessionUserCourses } from "../auth/checkSession";

export async function findOwnTicket(args: { sessionToken: string }) {

        const userid = await checkSessionUser({sessionToken: args.sessionToken})
        const ticket = await Ticket.find({ user: userid });     
        
        return ticket;
}

export async function findTicketUser(args: { sessionToken: string }) {

        const userid = await checkSessionUser({sessionToken: args.sessionToken})
        const ticket = await Ticket.findOne({ user: userid });     
        console.log(ticket?.user)
        return ticket?.user;
}

export async function findOwnCourseTicket(args: { sessionToken: string }) {

        //const userid = await checkSessionUser({sessionToken: args.sessionToken})
        const usercourse = await checkSessionUserCourses({sessionToken: args.sessionToken})
        const ticket = await Ticket.find({ course: usercourse });     
        
        return ticket;
}

export async function findTicketById(args: { _id: string }) {

        const ticket = await Ticket.findOne({ _id: new Types.ObjectId(args._id) });     
        
        return ticket;
}

export async function findTicketByUser(args: { user: string }) {

        const ticket = await Ticket.find({ user: args.user });     
    
        return ticket;
}