import mongoose, { Schema } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    frontEndLink: {
        type: String,
        required: true,
    },
    backEndLink: {
        type: String,
        required: true,
    },
    liveLink: {
        type: String,
        required: true,
    },

}, { timestamps: true });


const Project = mongoose.model<TProject>('projects', projectSchema);

export default Project;