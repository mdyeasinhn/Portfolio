import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import {  StatsService } from "./stats.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

//-------------Delete Blog  ------------------
const projectAndBlogCount = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await StatsService.projectAndBlogCount();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Blog deleted successfully!",
        data: result
    })
});

export const StatsController ={
    projectAndBlogCount
}