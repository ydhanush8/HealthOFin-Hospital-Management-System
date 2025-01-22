import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Doctor.css';

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({ name: '', specialty: '' });

    // Fetch doctors on component mount
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3001/doctors/');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add a new doctor
    const addDoctor = async () => {
        try {
            const response = await axios.post('http://localhost:3001/doctors/add', formData);
            setDoctors([...doctors, response.data]);
            setFormData({ name: '', specialty: '' });
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    // Delete a doctor
    const deleteDoctor = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/doctors/delete/${id}`);
            setDoctors(doctors.filter((doctor) => doctor._id !== id));
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    return (
        <div className="doctor-container">
            <div className="add-doctor">
                <h3>Add New Doctor</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="specialty"
                    placeholder="Specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                />
                <button onClick={addDoctor}>Add Doctor</button>
            </div>
            <div className="doctor-list">
                <h3>Doctors ({doctors.length})</h3>
                {doctors.map((doctor) => (
                    <div key={doctor._id} className="doctor-card">
                        <p><strong>{doctor.name}</strong></p>
                        <p>Specialty: {doctor.specialty}</p>
                        <p>Added: {new Date(doctor.createdAt).toLocaleDateString()}</p>
                        <button className="delete-button" onClick={() => deleteDoctor(doctor._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctor;
