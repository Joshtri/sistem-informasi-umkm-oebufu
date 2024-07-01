import express from "express";
import * as userController from '../controllers/user.controller.js'
const router = express.Router();
import protect from "../config/auth/protect.js";

router.get('/user', userController.userPage);
router.post('/user', userController.createUser);

// DELETE /user/:userId
router.delete('/user/:userId', userController.deleteUser);

export default router;