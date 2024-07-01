import express from "express";
const router = express.Router();
import * as kbliController from "../controllers/kbli.controller.js";
import protect from "../config/auth/protect.js";

router.get('/kbli', protect, kbliController.kbliPage);
router.get('/kbli_test',protect, kbliController.getKbliPageController)


router.post('/kbli',protect, kbliController.createKbliController)

router.get('/kbli/:id',protect, kbliController.getKbliDetailById);

router.delete('/kbli/:id',protect, kbliController.deleteKbli);

router.get('/kbli_edit/:id',protect, kbliController.getKbliByIdEdit)


router.put('/kbli/:id',protect, kbliController.updateKbli);


export default router;