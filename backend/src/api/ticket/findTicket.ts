import Ticket from "../../db/schemas/Ticket.schema";
import { Types } from "mongoose";
import { checkSessionUser, checkSessionUserCourses } from "../auth/checkSession";
import { findCourseTutor } from "../categorie/findCourse";

export async function findOwnTicket(args: { sessionToken: string }) {

        const userId = await checkSessionUser({sessionToken: args.sessionToken})
        const ticket = await Ticket.find({ user: userId });     
        
        return ticket;
}

export async function findTicketUser(args: { sessionToken: string }) {

        const userId = await checkSessionUser({sessionToken: args.sessionToken})
        const ticket = await Ticket.findOne({ user: userId });
        console.log(ticket?.user)
        return ticket?.user;
}

export async function findTicketUserById(args: { _id: string }) {
        const ticket = await Ticket.findOne({ _id: new Types.ObjectId(args._id) });
        console.log("User des Tickets per ID: " + ticket?.user)
        return ticket?.user;
}

export async function findOwnCourseTicket(args: { sessionToken: string }) {

        //const userid = await checkSessionUser({sessionToken: args.sessionToken})
        const userCourse = await checkSessionUserCourses({sessionToken: args.sessionToken})
        const ticket = await Ticket.find({ course: userCourse });     
        
        return ticket;
}

export async function findTicketCourseTutor(args: { _id: string }) {

        const ticketCourse = await findTicketCourseById({_id: args._id})
        if (ticketCourse != undefined){
                const courseTutor = await findCourseTutor({_id: ticketCourse})  
                return courseTutor;
        } else {
                return null
        }
}

export async function findTicketById(args: { _id: string }) {

        const ticket = await Ticket.findOne({ _id: new Types.ObjectId(args._id) });     
        
        return ticket;
}

export async function findTicketByUser(args: { user: string }) {

        const ticket = await Ticket.find({ user: args.user });     
    
        return ticket;
}

export async function findTicketCourseById(args: { _id: string }) {

        const ticket = await Ticket.findOne({ _id: new Types.ObjectId(args._id) });     
        
        return ticket?.course.toString();
}