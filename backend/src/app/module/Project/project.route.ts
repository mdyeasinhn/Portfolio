import express from 'express';
import { ProjectController } from './project.controller';


const router = express.Router();

router.get('/',
    ProjectController.getAllProject
);
router.get('/:id',
    ProjectController.getSingleProjectByID
);

router.post('/',
    ProjectController.createProject
);
router.patch('/:id',
    ProjectController.updateProjectByID
);

router.delete('/:id',
    ProjectController.deleteProject
);


export const projectRoutes = router;
