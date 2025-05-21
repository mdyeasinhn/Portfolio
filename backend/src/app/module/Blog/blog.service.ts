import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

//-------------Create Blog  ------------------
const createBlog = async (data: IBlog) => {
    const result = await Blog.create(data)
    return result;
}


//-------------Get all blog  ------------------
const getAllBlog = async () => {
    const result = await Blog.find({})
    return result;
};

//-------------Get single blog  ------------------
const getSingleBlogByID = async (id: string) => {
  const blog = await Blog.findById(id);
  return blog;
};

//-------------Update blog  ------------------
const updateBlogByID = async (blogId: string, data: IBlog) => {
    const result = await Blog.updateOne(
        { _id: blogId },
        data,
    );
    return result
};

const deleteBlog = async (id: string) => {
    const results = await Blog.deleteOne({ _id: id })
    return results;
};
export const BlogService = {
    createBlog,
    getAllBlog,
    updateBlogByID,
    deleteBlog,
    getSingleBlogByID
}