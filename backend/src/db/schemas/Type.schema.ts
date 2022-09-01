import { model, Schema } from "mongoose";
import { IType } from "../../interfaces/IType.interface";

const typeSchema = new Schema<IType>({
    name: String,
});

const Type = model<IType>('Type', typeSchema);
export default Type;