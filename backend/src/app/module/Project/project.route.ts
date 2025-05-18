import express from 'express';
import { ProjectController } from './project.controller';


const router = express.Router();

router.get('/',
    ProjectController.getAllProject
);

router.post('/',
    ProjectController.createProject
);

router.delete('/:id',
    ProjectController.deleteProject
);


export const projectRoutes = router;
