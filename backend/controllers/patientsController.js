import Patient from '../models/patientsModel.js';

class PatientController {
    async getPatients(req, res) {
        try {
        const patients = await Patient.find();
        res.status(200).json(patients);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    async createPatient(req, res) {
        try {
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }

    async updatePatient(req, res) {
        const { id } = req.params;
        try {
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        patient.name = req.body.name;
        patient.age = req.body.age;
        patient.gender = req.body.gender;

        const updatedPatient = await patient.save();
        res.status(200).json(updatedPatient);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }

    async deletePatient(req, res) {
        const { id } = req.params;
        try {
        const patient = await Patient.findByIdAndDelete(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
}

export default new PatientController();