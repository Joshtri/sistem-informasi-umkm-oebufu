import express from "express";
const router = express.Router();
import * as kegiatanController from "../controllers/kegiatan.controller.js";
import protect from "../config/auth/protect.js";

router.get('/kegiatan', protect, kegiatanController.kegiatanPage);
router.post('/kegiatan', protect, kegiatanController.createKegiatan);

router.get('/add_kegiatan',protect, kegiatanController.addKegiatanPage);

router.delete('/kegiatan/:id',protect, kegiatanController.deleteKegiatan);

// Route to update kegiatan
router.get('/edit_kegiatan/:id',protect, kegiatanController.updateKegiatanPage);

router.put('/update_kegiatan/:id',protect, kegiatanController.updateDataKegiatan);



export default router;