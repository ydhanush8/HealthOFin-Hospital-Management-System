import express from 'express';
import DoctorController from '../controllers/doctorsController.js';
const router = express.Router();

router.get('/', DoctorController.getDoctors);

router.post('/add', DoctorController.createDoctor);

router.post('/update/:id', DoctorController.updateDoctor);

router.delete('/delete/:id', DoctorController.deleteDoctor);

export default router;