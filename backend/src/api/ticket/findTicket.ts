import Ticket from "../../db/schemas/Ticket.schema";
import { Types } from "mongoose";
import { checkSessionUser, checkSessionUserCourses, checkSessionUserIsAdmin } from "../auth/checkSession";
import { findCourseTutor } from "../course/findCourse";

export async function findOwnTicket(args: { sessionToken: string }) { //gibt alle Tickets zur Session aus (Meine Tickets)

        const userId = await checkSessionUser({sessionToken: args.sessionToken})
        const ticket = await Ticket.find({ user: userId });     
        
        return ticket;
}

export async function findOwnTicketAnnotationById(args: { _id: string }) { //gibt alle Ticket Annotations zur Session aus (Meine Tickets)

        const ticket = await Ticket.findOne({ _id: new Types.ObjectId(args._id) });     
        
        return ticket?.annotation.toString();
}

export async function findOwnTicketAnnotation(args: { sessionToken: string }) { //gibt alle Ticket Annotations zur Session aus (Meine Tickets)

        const userId = await checkSessionUser({sessionToken: args.sessionToken})
        const ticket = await Ticket.findOne({ user: userId });     
        
        return ticket?.annotation.toString();
}

export async function findTicketUser(args: { sessionToken: string }) { //gibt den User (owner) eines Tickets aus

        const userId = await checkSessionUser({sessionToken: args.sessionToken})
        const ticket = await Ticket.findOne({ user: userId });

        return ticket?.user;
}

export async function findTicketUserById(args: { _id: string }) { //gibt den User eines via ID gesuchten Tickets aus
        const ticket = await Ticket.findOne({ _id: new Types.ObjectId(args._id) });

        return ticket?.user;
}

export async function findTicketByPrio(args: { sessionToken: string, priority: number }) { //gibt alle Tickets mit der gesuchten Prio des Kurses aus, wo der User Tutor ist  (Tickets meines Kurses)
        console.log(args.sessionToken)
        const userCourse = await checkSessionUserCourses({sessionToken: args.sessionToken})
        const userAdmin = await checkSessionUserIsAdmin({sessionToken: args.sessionToken})
        if (userCourse != undefined && (await checkSessionUserIsAdmin({ sessionToken: args.sessionToken })) == false){
                const ticket = await Ticket.find({course: userCourse, priority: args.priority})

                return ticket
        } else {
                const ticket = await Ticket.findOne({priority: args.priority})
                return ticket
        }
}

export async function findOwnCourseTicket(args: { sessionToken: string }) { //gibt alle Tickets des Kurses eines Users aus (Tickets meines Kurses)

        const userCourse = await checkSessionUserCourses({sessionToken: args.sessionToken})
        const ticket = (await Ticket.find({ course: userCourse }).populate('type').populate('categorie').populate('status').populate('priority'));     
        
        return ticket;
}

export async function findTicketCourseTutor(args: { _id: string }) { //gibt den Tutor des Kurses eines via ID gesuchten Tickets aus
        const ticketCourse = await findTicketCourseById({_id: args._id})
        if (ticketCourse != undefined){
                const courseTutor = await findCourseTutor({_id: ticketCourse})  
                console.log("Ticket Course Tutor: " + courseTutor)
                return courseTutor;
        } else {
                return null
        }
}

export async function findTicketById(args: { _id: string }) { //gibt ein via ID gesuchtes Ticket aus

        const ticket = await Ticket.findOne({ _id: new Types.ObjectId(args._id) }).populate('user').populate('type').populate('status').populate('priority').populate('annotation').populate('categorie').populate({ path : 'annotation', populate : { path : 'user' } });     
        
        return ticket;
}

export async function findTicketTypeById(args: { _id: string }) { //gibt eine Art für ein via ID gesuchtes Ticket aus

        const ticket = await Ticket.findOne({ _id: new Types.ObjectId(args._id) });     
        
        return ticket?.type;
}

export async function findTicketByUser(args: { user: string }) { //gibt alle Tickets eines via ID gesuchten Users aus

        const ticket = await Ticket.find({ user: args.user });     
    
        return ticket;
}

export async function findTicketByCourse(args: { course: string }) { //gibt alle Tickets eines via ID gesuchten Kurses aus

        const ticket = await Ticket.find({ course: args });     

        return ticket;
}

export async function findTicketCourseById(args: { _id: string }) { //gibt den Kurs eines via ID gesuchten Tickets aus
        const ticket = await Ticket.findOne({ _id: new Types.ObjectId(args._id) });     
        return ticket?.course.toString();
}
