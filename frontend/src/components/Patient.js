import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Patient.css';

const Patient = () => {
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({ name: '', age: '', gender: '' });

    // Fetch patients on component mount
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3001/patients/');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add a new patient
    const addPatient = async () => {
        try {
            const response = await axios.post('http://localhost:3001/patients/add', formData);
            setPatients([...patients, response.data]);
            setFormData({ name: '', age: '', gender: '' });
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    };

    // Delete a patient
    const deletePatient = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/patients/delete/${id}`);
            setPatients(patients.filter((patient) => patient._id !== id));
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    return (
        <div className="patient-container">
            <div className="add-patient">
                <h3>Add New Patient</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    value={formData.gender}
                    onChange={handleChange}
                />
                <button onClick={addPatient}>Add Patient</button>
            </div>
            <div className="patient-list">
                <h3>Patients ({patients.length})</h3>
                {patients.map((patient) => (
                    <div key={patient._id} className="patient-card">
                        <p><strong>{patient.name}</strong></p>
                        <p>Age: {patient.age}</p>
                        <p>Gender: {patient.gender}</p>
                        <button className="delete-button" onClick={() => deletePatient(patient._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Patient;
