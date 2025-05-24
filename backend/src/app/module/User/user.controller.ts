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
//-------------Login User  ------------------
const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User login successfull!",
        data: result
    })
});
//-------------Login User  ------------------
const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await UserService.getSingleUser(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User login successfull!",
        data: result
    })
});

export const UserController = {
    createUser,
    loginUser,
    getSingleUser
}