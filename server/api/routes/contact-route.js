import express from 'express';

import { createContact,deleteContact,getAllContacts,getContactById,updateContact } from '../controllers/contact-controller.js';

const router = express.Router();
router.post('/', createContact);
router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;