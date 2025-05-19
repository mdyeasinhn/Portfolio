import express from 'express';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post('/',
    BlogController.createBlog
);



export const blogRoutes = router;
