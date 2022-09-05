import { model, Schema } from "mongoose";
import { IStatus } from "../../interfaces/IStatus.interface";

const statusSchema = new Schema<IStatus>({
    name: String,
});

const Status = model<IStatus>('Status', statusSchema);
export default Status;