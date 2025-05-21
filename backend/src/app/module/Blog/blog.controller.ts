import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BlogService } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


//-------------Create Blog  ------------------
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
//-------------Get all Blog  ------------------
const getAllBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await BlogService.getAllBlog();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Blogs retrieved successfully!",
        data: result
    })
});
//-------------Get single Blog  ------------------
const getSingleBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
    const result = await BlogService.getSingleBlogByID(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Single Blog retrieved successfully!",
        data: result
    })
});
//-------------update Blog  ------------------
const updateBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const result = await BlogService.updateBlogByID(id, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Blog updated successfully!",
        data: result
    })
});
//-------------Delete Blog  ------------------
const deleteBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const result = await BlogService.deleteBlog(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Blog deleted successfully!",
        data: result
    })
});

export const BlogController = {
    createBlog,
    getAllBlog,
    updateBlog,
    deleteBlog,
    getSingleBlog
}