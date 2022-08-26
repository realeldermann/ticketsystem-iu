import { model, Schema } from "mongoose";
import { ICategorie } from "../../interfaces/ICategorie.interface";

const categorieSchema = new Schema<ICategorie>({
    name: String,
});

const Categories = model<ICategorie>('Categories', categorieSchema);
export default Categories;