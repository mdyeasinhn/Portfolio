import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";
import { sendEmail } from "../../utils/sendEmail";

//-------------Create Contact  ------------------
const createContact = async (data:IContact ) => {
    const result = await Contact.create(data);
    
    try {
        console.log('Attempting to send email to:', process.env.GMAIL_RECIPIENT);
        await sendEmail(
            process.env.GMAIL_RECIPIENT as string,
            `New Contact from ${data.name}`,
            `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nMessage: ${data.message}`,
            `<h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
            <p><strong>Message:</strong> ${data.message}</p>`
        );
        console.log('Email sent successfully');
    } catch (error: any) {
        console.error('Failed to send email:', error.message);
    }
    
    return result;
};
//-------------Get all Contact  ------------------
const getAllContact = async ( ) => {
    const result = await Contact.find()
    return result;
};


export const ContactService = {
    createContact,
    getAllContact
}