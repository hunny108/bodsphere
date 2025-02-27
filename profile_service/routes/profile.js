import express from 'express';
import ProfileController from '../controllers/profileController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import upload from '../../profile_service/utility/uploadHandler.js';

const router = express.Router();



router.post('/',authenticate,upload.any(), ProfileController.createProfile);
router.get('/',authenticate, ProfileController.getProfile);
router.put('/',authenticate,upload.any(), ProfileController.updateProfile);
router.delete('/',authenticate,upload.any(), ProfileController.deleteProfile);

export default router;
