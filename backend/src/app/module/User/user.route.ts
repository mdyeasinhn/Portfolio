import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/',
    UserController.createUser
);
router.get('/:id',
    UserController.getSingleUser
);

router.post('/login',
    UserController.loginUser
);


export const userRoutes = router;
