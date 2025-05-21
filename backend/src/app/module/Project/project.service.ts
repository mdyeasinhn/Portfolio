import { TProject } from "./project.interface"
import Project from "./project.model";

//-------------Create Project  ------------------
const createProject = async (data: TProject) => {
    const result = await Project.create(data)
    return result;
}

//-------------Get all Project  ------------------
const getAllProject = async () => {
    const result = await Project.find({})
    return result;
};

const getSingleProjectByID = async (projectId: string) => {
  const project = await Project.findById(projectId);
  return project;
};

const updateProjectByID = async (projectId: string, data: TProject) => {
    const result = await Project.updateOne(
        { _id: projectId },
        data,
        {
            new: true,
        }
    );
    return result
};


const deleteProject = async (id: string) => {
    const results = await Project.deleteOne({ _id: id })
    return results;
};
export const ProjectService = {
    createProject,
    getAllProject,
    deleteProject,
    updateProjectByID,
    getSingleProjectByID
}