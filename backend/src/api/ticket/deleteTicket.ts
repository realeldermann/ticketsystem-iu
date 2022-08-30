import Ticket from "../../db/schemas/Ticket.schema";
import { Types } from "mongoose";

export async function deleteTicket(args: { _id: string }) { //löscht ein via ID gesuchtes Ticket

        const ticket = await Ticket.findOneAndDelete({ _id: new Types.ObjectId(args._id) });     
        
        return true;
}