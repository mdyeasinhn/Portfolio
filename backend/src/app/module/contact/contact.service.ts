import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";

//-------------Create Project  ------------------
const createContact = async (data:IContact ) => {
    const result = await Contact.create(data)
    return result;
};


export const ContactService = {
    createContact
}