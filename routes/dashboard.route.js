import express from "express";
const router = express.Router();
import * as dashboardController from "../controllers/dashboard.controller.js";

import protect from "../config/auth/protect.js";
import { updateUser, updateUserPassword } from "../controllers/user.controller.js";


router.get('/main/dashboard', protect, dashboardController.dashboardPage);

router.get('/main/informasi_akun', protect,dashboardController.informasiAkunPage);

// Route for updating password
router.post('/update_password', protect,updateUserPassword);

// Route to update user details
router.post('/update_user', protect,updateUser);


router.get('/logout', protect, dashboardController.logoutUser);

export default router;