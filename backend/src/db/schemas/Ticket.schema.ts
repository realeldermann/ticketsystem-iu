import { model, Schema } from "mongoose";
import { ITicket } from "../../interfaces/ITicket.interface";

const ticketSchema = new Schema<ITicket>({
    title: String,
    created: Date,
    status: Boolean,
    priority: Number,
    text: String,
    //categorie: { type: 'ObjectId', ref: 'Categorie' },
    //course: { type: 'ObjectId', ref: 'Course' },
    user: { type: 'ObjectId', ref: 'User' },
});

const Ticket = model<ITicket>('Ticket', ticketSchema);
export default Ticket;