import { Types } from "mongoose";
import Categorie from "../../db/schemas/Categorie.schema";

export async function findAllCategories(args: {}) { //gibt alle Kategorien aus
    const categorie = await Categorie.find({ }); 
       
    return categorie;
}

export async function findCategorieById(args: { _id: string }) { //gibt die Kategorie aus welche per ID angesprochen wurde

    const categorie = await Categorie.findOne({ _id: new Types.ObjectId(args._id) });     
    
    return categorie;
}

