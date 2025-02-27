import express from 'express';
import VideoController from '../controllers/videoController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import upload from '../utility/uploadHandler.js';

const router = express.Router();

 router.post('/upload', authenticate,upload.any(), VideoController.uploadVideo);
 router.get('/', VideoController.getVideos);

export default router;
