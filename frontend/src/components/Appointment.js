import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Appointment.css';

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [formData, setFormData] = useState({ patientName: '', doctorName: '' });

    useEffect(() => {
        const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:3001/appointments/');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
        };

        fetchAppointments();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addAppointment = async () => {
        try {
        const response = await axios.post('http://localhost:3001/appointments/add', formData);
        setAppointments([...appointments, response.data]);
        setFormData({ patientName: '', doctorName: '' });
        } catch (error) {
        console.error('Error adding appointment:', error);
        }
    };

    const deleteAppointment = async (id) => {
        try {
        await axios.delete(`http://localhost:3001/appointments/delete/${id}`);
        setAppointments(appointments.filter((appointment) => appointment._id !== id));
        } catch (error) {
        console.error('Error deleting appointment:', error);
        }
    };

    return (
        <div className="appointment-container">
        <div className="add-appointment">
            <h3>Add New Appointment</h3>
            <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={handleChange}
            />
            <input
            type="text"
            name="doctorName"
            placeholder="Doctor Name"
            value={formData.doctorName}
            onChange={handleChange}
            />
            <button onClick={addAppointment}>Add Appointment</button>
        </div>
        <div className="appointment-list">
            <h3>Appointments ({appointments.length})</h3>
            {appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-card">
                <p>
                <strong>{appointment.patientName}</strong>
                </p>
                <p>Doctor: {appointment.doctorName}</p>
                <p>Date: {new Date(appointment.createdAt).toLocaleDateString()}</p>
                <button
                className="delete-button"
                onClick={() => deleteAppointment(appointment._id)}
                >
                Delete
                </button>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Appointment;
