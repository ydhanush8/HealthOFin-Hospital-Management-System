import express from 'express';
import AppointmentController from '../controllers/appointmentsController.js';
const router = express.Router();

router.get('/', AppointmentController.getAppointments);

router.post('/add', AppointmentController.createAppointment);

router.post('/update/:id', AppointmentController.updateAppointment);

router.delete('/delete/:id', AppointmentController.deleteAppointment);

export default router