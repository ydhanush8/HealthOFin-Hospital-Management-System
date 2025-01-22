import express from 'express';
import PatientController from '../controllers/patientsController.js';
const router = express.Router();

router.get('/', PatientController.getPatients);

router.post('/add', PatientController.createPatient);

router.post('/update/:id', PatientController.updatePatient);

router.delete('/delete/:id', PatientController.deletePatient);

export default router