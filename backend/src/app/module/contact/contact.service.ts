import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";

//-------------Create Contact  ------------------
const createContact = async (data:IContact ) => {
    const result = await Contact.create(data)
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