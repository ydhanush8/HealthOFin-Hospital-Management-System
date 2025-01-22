import Appointment from '../models/appointmentsModel.js';

class AppointmentController {
    async getAppointments(req, res) {
        try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    async createAppointment(req, res) {
        try {
        const newAppointment = new Appointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }

    async updateAppointment(req, res) {
        const { id } = req.params;
        try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(updatedAppointment);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    async deleteAppointment(req, res) {
        const { id } = req.params;
        try {
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
}

export default new AppointmentController();