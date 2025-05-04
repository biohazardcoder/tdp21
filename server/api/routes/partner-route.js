import express from 'express';

import { getAllPartners, createPartner, updatePartner, deletePartner } from '../controllers/partner-controller.js';
import uploadImage from '../../middlewares/uploadImage.js';

const router = express.Router();
router.get('/', getAllPartners);
router.post('/',uploadImage, createPartner);
router.put('/:id', updatePartner);
router.delete('/:id', deletePartner);

export default router;