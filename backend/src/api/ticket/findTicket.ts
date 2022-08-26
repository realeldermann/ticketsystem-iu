import Ticket from "../../db/schemas/Ticket.schema";
import { Types } from "mongoose";

export async function findTicketById(args: { _id: string }) {

            const ticket = await Ticket.findOne({ _id: new Types.ObjectId(args._id) });     
        
            return ticket;
    }
