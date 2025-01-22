import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientName: { 
        type: String, 
        required: true 
    },
    doctorName: { 
        type: String, 
        required: true 
    }
    }, {
        timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;