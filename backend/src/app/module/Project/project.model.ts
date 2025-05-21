import mongoose, { Schema } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
        match: [/^https?:\/\/.+\..+$/, 'Please enter a valid image URL']
    },
    link: {
        type: String,
        match: [/^https?:\/\/.+\..+$/, 'Please enter a valid URL']
    },
    github: {
        type: String,
        match: [/^https?:\/\/github\.com\/.+$/, 'Please enter a valid GitHub URL']
    },
    category: {
        type: String,
        required: true,
        enum: ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Other']
    },
    techStack: {
        type: [String],
        default: []
    },
    features: {
        type: [String],
        default: []
    },
    challenges: String,
    solutions: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });


const Project = mongoose.model<TProject>('projects', projectSchema);

export default Project;