import { model, Schema } from "mongoose";
import { ITicket } from "../../interfaces/ITicket.interface";

const ticketSchema = new Schema<ITicket>({
    title: String,
    created: Date,
    status: { type: 'ObjectId', ref: 'Status' },
    priority: { type: 'ObjectId', ref: 'Priority' },
    text: String,
    categorie: { type: 'ObjectId', ref: 'Categorie' },
    course: { type: 'ObjectId', ref: 'Course' },
    user: { type: 'ObjectId', ref: 'User' },
    annotation: { type: 'ObjectId', ref: 'Annotation' },
    type: { type: 'ObjectId', ref: 'Type' }
});

const Ticket = model<ITicket>('Ticket', ticketSchema);
export default Ticket;