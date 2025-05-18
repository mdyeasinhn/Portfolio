import { Router } from 'express'
import { userRoutes } from '../module/User/user.route';
import { projectRoutes } from '../module/Project/project.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/projects',
    route: projectRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
