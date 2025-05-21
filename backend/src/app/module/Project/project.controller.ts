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
        message: "All projects retrieved successfully!",
        data: result
    })
});

//-------------Get all Project  ------------------
const updateProjectByID = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await ProjectService.updateProjectByID(id, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Project updated successfull!",
        data: result
    })
});
//-------------Get single Project  ------------------
const getSingleProjectByID = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await ProjectService.getSingleProjectByID(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Single project retrieved successfully!",
        data: result
    })
});
//-------------Delete a Project  ------------------
const deleteProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await ProjectService.deleteProject(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Project deleted successfull!",
        data: result
    })
});

export const ProjectController = {
    createProject,
    getAllProject,
    deleteProject,
    updateProjectByID,
    getSingleProjectByID
}