import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProjectService } from "./project.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

//-------------Create Project  ------------------
const createProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await ProjectService.createProject(data);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Project Created successfull!",
        data: result
    })
});
//-------------Get all Project  ------------------
const getAllProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ProjectService.getAllProject();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Get all project successfull!",
        data: result
    })
});

export const ProjectController = {
    createProject,
    getAllProject
}