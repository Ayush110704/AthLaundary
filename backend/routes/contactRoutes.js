import express from 'express';
import { createContactMessage, getContactMessages, updateContactStatus, deleteContactMessage } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', createContactMessage);
router.get('/', getContactMessages);
router.put('/:id', updateContactStatus);
router.delete('/:id', deleteContactMessage);

export default router;
