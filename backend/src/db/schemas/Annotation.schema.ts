import { model, Schema } from "mongoose";
import { IAnnotation } from "../../interfaces/IAnnotation.interface";

const annotationSchema = new Schema<IAnnotation>({
    created: Date,
    text: String,
    user: { type: 'ObjectId', ref: 'User' },
});

const Annotation = model<IAnnotation>('Annotation', annotationSchema);
export default Annotation;