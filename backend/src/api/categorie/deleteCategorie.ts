import { Types } from "mongoose";
import Categorie from "../../db/schemas/Categorie.schema";

export async function deleteCategorie(args: { _id: string }) { //löscht eine Kategorie

    await Categorie.findByIdAndDelete({ _id: new Types.ObjectId(args._id) });     
        
    return true;
}