import { Blog } from "../Blog/blog.model";
import Project from "../Project/project.model";

 const projectAndBlogCount = async () => {
    const [blogCount, projectCount] = await Promise.all([
        Blog.countDocuments(),
        Project.countDocuments()
    ]);

    return {
        blogCount,
        projectCount,
    };
};


   export const StatsService ={
    projectAndBlogCount
   }
