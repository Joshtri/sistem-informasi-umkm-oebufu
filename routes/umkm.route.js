import express from "express";
const router = express.Router();
import protect from "../config/auth/protect.js";
import * as umkmController from '../controllers/umkm.controller.js';

router.get('/umkm',protect, umkmController.umkmPage);

router.get('/add_umkm',protect, umkmController.addUmkmPage);

router.post('/umkm',protect, umkmController.createdUmkm);


router.get('/umkm/:id',protect, umkmController.getUmkmDetailById);

router.delete('/umkm/:id',protect, umkmController.deleteUmkm);

router.get('/umkm_edit/:id',protect, umkmController.getUmkmByIdEdit);

router.put('/umkm/:id',protect, umkmController.updateUmkm);

export default router;