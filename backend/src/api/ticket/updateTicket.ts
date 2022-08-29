import Ticket from "../../db/schemas/Ticket.schema";
import { Types } from "mongoose";
import { checkSessionUser, checkSessionUserCourses } from "../auth/checkSession";