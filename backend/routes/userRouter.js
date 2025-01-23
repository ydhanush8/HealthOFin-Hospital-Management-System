import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', UserController.signUpUser);
router.post('/signin', UserController.signInUser);
router.post('/change-password', UserController.changePassword);

export default router; 