import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service";
//-------------Create User  ------------------
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await UserService.createUserIntoDB(email, password);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User Created successfull!",
        data: result
    })
});

export const UserController = {
    createUser
}