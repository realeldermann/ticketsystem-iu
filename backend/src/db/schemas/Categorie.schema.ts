import { model, Schema } from "mongoose";
import { ICategorie } from "../../interfaces/ICategorie.interface";

const categorieSchema = new Schema<ICategorie>({
    name: String,
});

const Categorie = model<ICategorie>('Categorie', categorieSchema);
export default Categorie;