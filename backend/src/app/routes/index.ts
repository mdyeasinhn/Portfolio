import { Router } from 'express'
import { userRoutes } from '../module/User/user.route';
import { projectRoutes } from '../module/Project/project.route';
import { blogRoutes } from '../module/Blog/blog.route';
import { contactRoutes } from '../module/contact/contact.route';
import { statsRoutes } from '../module/Stats/route';


const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/projects',
    route: projectRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/contacts',
    route: contactRoutes,
  },
  {
    path: '/stats',
    route: statsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
