import { Document } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    phone?: number;
    message: string;
}

