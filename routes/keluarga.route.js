import express from "express";
import * as keluargaController from '../controllers/keluarga.controller.js'
const router = express.Router();
import protect from "../config/auth/protect.js";

router.get('/keluarga', protect, keluargaController.keluargaPage);
router.post('/keluarga', protect, keluargaController.createKeluarga);



router.get('/keluarga/:id', protect, keluargaController.getKeluargaDetailById)

router.delete('/keluarga/:id', protect, keluargaController.deleteKeluarga);

router.get('/keluarga_edit/:id', protect, keluargaController.getKeluargaByIdEdit)

router.put('/keluarga/:id', protect, keluargaController.updateKeluarga);
export default router;