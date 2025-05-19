import mongoose, { Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const BlogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    image: String
},
    {
        timestamps: true
    });

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);