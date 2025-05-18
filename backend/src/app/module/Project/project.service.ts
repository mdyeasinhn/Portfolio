import { TProject } from "./project.interface"
import Project from "./project.model";

const createProject = async (data: TProject) => {
    const result = await Project.create(data)
    return result;
}

const getAllProject = async () => {
    const result = await Project.find({})
    return result;
};
export const ProjectService = {
    createProject,
    getAllProject
}