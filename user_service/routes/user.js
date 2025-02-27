import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getUserDetail',authenticate, UserController.getUserDetailById);

export default router;
