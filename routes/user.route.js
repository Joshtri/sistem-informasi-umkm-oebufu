import express from "express";
import * as userController from '../controllers/user.controller.js'
const router = express.Router();
import protect from "../config/auth/protect.js";

router.get('/user', protect, userController.userPage);
router.post('/user',protect, userController.createUser);

// DELETE /user/:userId
router.delete('/user/:userId',protect, userController.deleteUser);

export default router;