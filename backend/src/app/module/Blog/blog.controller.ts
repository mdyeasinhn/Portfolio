import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BlogService } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


//-------------Create Project  ------------------
const createBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await BlogService.createBlog(data);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Blog Created successfull!",
        data: result
    })
});

export const BlogController = {
    createBlog
}