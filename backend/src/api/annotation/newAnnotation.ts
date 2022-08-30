import Annotation from "../../db/schemas/Annotation.schema";

export async function annotationHandler(args: { text: string, user: string}) { //erstellt neuen User      
       
    const annotation = new Annotation({
        text: args.text,
        user: args.user,
        created: new Date(),
        });
    
        await annotation.save();
        console.log(annotation._id)
    return annotation._id
}