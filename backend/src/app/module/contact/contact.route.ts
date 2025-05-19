import express from 'express';
import { ContactController } from './contact.controller';

const router = express.Router();

router.get('/',
    ContactController.getAllContacts
);
router.post('/',
    ContactController.createContact
);

export const contactRoutes = router;
