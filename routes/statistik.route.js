import express from "express";
const router = express.Router();
import * as statistikController from "../controllers/statistik.controller.js";
import * as umkmController from '../controllers/umkm.controller.js'
import protect from "../config/auth/protect.js";
import { getPendidikanStatistics } from "../repositories/penduduk.repository.js";

router.get('/main_stats', protect, statistikController.statisticPage);

// router.post('/login', loginController.loginUser);

// Route to get the total number of UMKM "mikro"
router.get('/umkm-mikro', protect,umkmController.getTotalUmkmMikro);

// Route to get the total number of UMKM "kecil"
router.get('/umkm-kecil',protect, umkmController.getTotalUmkmKecil);

// Route to get the total number of UMKM "menengah"
router.get('/umkm-menengah',protect, umkmController.getTotalUmkmMenengah);
router.get('/pendidikan-statistics', protect, getPendidikanStatistics);

export default router;