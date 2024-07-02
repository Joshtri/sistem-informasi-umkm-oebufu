import express from "express";

import multerConfig from '../config/multerConfig.js';
import * as publikasiController from '../controllers/publikasi.controller.js';
import protect from "../config/auth/protect.js";
const router = express.Router();


router.get('/publikasi',protect, publikasiController.publikasiPage);
router.get('/add_publikasi',protect, publikasiController.addPublikasiPage);
// Route untuk mengunggah publikasi dengan multer fields
router.post('/upload_publikasi', multerConfig.fields([
    { name: 'berkas_publikasi_pdf', maxCount: 1 },
    { name: 'berkas_publikasi_excel', maxCount: 1 },
    { name: 'berkas_publikasi_doc', maxCount: 1 }
]),protect, publikasiController.createPublikasi);


router.delete('/publikasi/:id',protect, publikasiController.deletePublikasi);

router.get('/publikasi/:id',protect, publikasiController.detailPublikasiPage);

router.get('/edit_publikasi/:id',protect, publikasiController.editPublikasiPage);

// Route untuk memperbarui publikasi dengan berkas baru
router.post('/update_publikasi/:id', multerConfig.fields([
    { name: 'newBerkasPdf', maxCount: 1 },
    { name: 'newBerkasExcel', maxCount: 1 },
    { name: 'newBerkasDoc', maxCount: 1 }
]),protect ,publikasiController.updatePublikasi);

export default router;