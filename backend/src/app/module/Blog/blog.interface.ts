import { Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    description: string;
    author: string;
    category: 'Technology' | 'Health' | 'Lifestyle' | 'Business';
    image: string
}

