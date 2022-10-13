import Ticket from "../../db/schemas/Ticket.schema";
import { Types } from "mongoose";
import { checkSessionUser, checkSessionUserCourses } from "../auth/checkSession";

export async function updateTicketAnnotation(args: { _id: string, annotation: string }) { //updated Annotations zu einem Ticket via ID

    const ticket = await Ticket.findByIdAndUpdate({ _id: new Types.ObjectId(args._id)}, {annotation: args.annotation});     
    
    return true;
}

export async function updateTicketCategorie(args: { _id: string, categorie: string }) { //updated die Kategorie zu einem Ticket via ID

    const ticket = await Ticket.findByIdAndUpdate({ _id: new Types.ObjectId(args._id)}, {categorie: args.categorie});     
    
    return true;
}

export async function updateTicketOwner(args: { _id: string, owner: string }) { //updated den Ticket Besitzer via ID

    const ticket = await Ticket.findByIdAndUpdate({ _id: new Types.ObjectId(args._id)}, {owner: args.owner});     
    
    return true;
}

export async function updateTicketStatus(args: { _id: string, status: string }) { //updated den Status zu einem Ticket via ID

    const ticket = await Ticket.findByIdAndUpdate({ _id: new Types.ObjectId(args._id)}, {status: args.status});     
    
    return true;
}

export async function updateTicketTitle(args: { _id: string, title: string}) { //updated den Title eines Tickets via ID

    const ticket = await Ticket.findByIdAndUpdate({ _id: new Types.ObjectId(args._id)}, {title: args.title });     
    
    return true;
}

export async function updateTicketPriority(args: { _id: string, priority: string }) { //updated die Priorität eines Tickets via ID

    const ticket = await Ticket.findByIdAndUpdate({ _id: new Types.ObjectId(args._id)}, {priority: args.priority});     
    
    return true;
}

export async function updateTicketCourse(args: { _id: string, course: string}) { //updated den Kurs eines Tickets via ID

    const ticket = await Ticket.findByIdAndUpdate({ _id: new Types.ObjectId(args._id)}, {course: args.course});     
    
    return true;
}

export async function updateTicketText(args: { _id: string, text: string}) { //updated den Text eines Tickets via ID

    const ticket = await Ticket.findByIdAndUpdate({ _id: new Types.ObjectId(args._id)}, {text: args.text});     
    
    return true;
}