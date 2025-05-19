import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ContactService } from "./contact.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

//-------------Create Contact  ------------------
const createContact = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await ContactService.createContact(data);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Message send successfull!",
        data: result
    })
});

const getAllContacts = catchAsync(async (req, res) => {
    const result = await ContactService.getAllContact()

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'All Messages Getting Successfull',
        data: result,
    })
})

export const ContactController = {
    createContact,
    getAllContacts
}