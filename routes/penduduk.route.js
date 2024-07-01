import express from "express";
import * as pendudukController from '../controllers/penduduk.controller.js';
const router = express.Router();

import protect from "../config/auth/protect.js";

router.get('/penduduk',protect, pendudukController.pendudukPage);
router.post('/penduduk',protect, pendudukController.createPenduduk);



router.get('/penduduk/:id',protect, pendudukController.getPendudukDetailById);

router.delete('/penduduk/:id',protect, pendudukController.deletePenduduk);

router.get('/penduduk_edit/:id', pendudukController.getPendudukByIdEdit);


router.put('/penduduk/:id',protect, pendudukController.updatePenduduk)
export default router;