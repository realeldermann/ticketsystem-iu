import { model, Schema } from "mongoose";
import { IPriority } from "../../interfaces/IPriority.interface";

const prioritySchema = new Schema<IPriority>({
    name: String,
});

const Priority = model<IPriority>('Priority', prioritySchema);
export default Priority;