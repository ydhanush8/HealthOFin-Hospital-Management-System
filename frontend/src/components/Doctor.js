import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Doctor.css';

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({ name: '', specialty: '' });
    const [editingDoctor, setEditingDoctor] = useState(null); 

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addDoctor = async () => {
        try {
        const response = await axios.post('http://localhost:3001/doctors/add', formData);
        setDoctors([...doctors, response.data]);
        setFormData({ name: '', specialty: '' });
        } catch (error) {
        console.error('Error adding doctor:', error);
        }
    };

    const deleteDoctor = async (id) => {
        try {
        await axios.delete(`http://localhost:3001/doctors/delete/${id}`);
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
        } catch (error) {
        console.error('Error deleting doctor:', error);
        }
    };

    const startEditing = (doctor) => {
        setEditingDoctor(doctor); 
        setFormData({ name: doctor.name, specialty: doctor.specialty });
    };

    const updateDoctor = async () => {
        try {
        const response = await axios.post(
            `http://localhost:3001/doctors/update/${editingDoctor._id}`,
            formData
        );
        setDoctors(
            doctors.map((doctor) =>
            doctor._id === editingDoctor._id ? response.data : doctor
            )
        );
        setEditingDoctor(null);
        setFormData({ name: '', specialty: '' }); 
        } catch (error) {
        console.error('Error updating doctor:', error);
        }
    };

    return (
        <div className="doctor-container">
        <div className="add-doctor">
            <h3>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h3>
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
            {editingDoctor ? (
            <button onClick={updateDoctor}>Update Doctor</button>
            ) : (
            <button onClick={addDoctor}>Add Doctor</button>
            )}
        </div>
        <div className="doctor-list">
            <h3>Doctors ({doctors.length})</h3>
            {doctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card">
                <p><strong>{doctor.name}</strong></p>
                <p>Specialty: {doctor.specialty}</p>
                <p>Added: {new Date(doctor.createdAt).toLocaleDateString()}</p>
                <button
                className="delete-button"
                onClick={() => deleteDoctor(doctor._id)}
                >
                Delete
                </button>
                <button
                className="edit-button"
                onClick={() => startEditing(doctor)}
                >
                Edit
                </button>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Doctor;
