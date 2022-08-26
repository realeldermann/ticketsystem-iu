import Session from "../../db/schemas/Session.schema";
import Ticket from "../../db/schemas/Ticket.schema";
import User from "../../db/schemas/User.schema";

export async function findUserTicket(args: { userid: string }) {

            const ticket = await Ticket.find({ userid: args.userid });     
        
            return ticket;
    }

    // Noch nicht funktionstüchtig
    // Soll später das Suchen nach bestimmten Tickets ermöglichen (via Kurs, User und ID)