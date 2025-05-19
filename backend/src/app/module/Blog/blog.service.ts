import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

//-------------Create Blog  ------------------
const createBlog = async (data: IBlog) => {
    const result = await Blog.create(data)
    return result;
}


export const BlogService = {
    createBlog
}