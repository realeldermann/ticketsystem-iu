import { model, Schema } from "mongoose";
import { ICourse } from "../../interfaces/ICourse.interface";

const courseSchema = new Schema<ICourse>({
    name: String,
    tutor: { type: 'ObjectId', ref: 'User' },
});

const Course = model<ICourse>('Course', courseSchema);
export default Course;