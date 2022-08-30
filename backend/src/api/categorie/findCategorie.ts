import { Types } from "mongoose";
import Categorie from "../../db/schemas/Categorie.schema";

export async function findAllCategories(args: {}) {
    const categorie = await Categorie.find({ });     
    return categorie;
}

export async function findCategorieById(args: { _id: string }) {

    const categorie = await Categorie.findOne({ _id: new Types.ObjectId(args._id) });     
    
    return categorie;
}

