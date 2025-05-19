import mongoose, { Schema } from "mongoose";
import { IContact } from "./contact.interface";


const ContactSchema = new Schema<IContact>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    message: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    });

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);
