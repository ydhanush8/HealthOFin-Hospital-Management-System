import Doctor from '../models/doctorsModel.js';

class DoctorController {
    async getDoctors(req, res) {
        try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    async createDoctor(req, res) {
        try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }

    async updateDoctor(req, res) {
        const { id } = req.params;
        try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.name = req.body.name;
        doctor.specialty = req.body.specialty;

        const updatedDoctor = await doctor.save();
        res.status(200).json(updatedDoctor);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }

    async deleteDoctor(req, res) {
        const { id } = req.params;
        try {
        const doctor = await Doctor.findByIdAndDelete(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
}

export default new DoctorController();