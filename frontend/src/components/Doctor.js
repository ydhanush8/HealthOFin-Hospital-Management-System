import React, { useState, useEffect } from 'react';
import '../styles/Doctor.css';
import API from '../Api';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({ name: '', specialty: '' });
    const [editingDoctor, setEditingDoctor] = useState(null); 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    useEffect(() => {
        const fetchDoctors = async () => {
        try {
            const response = await API.get('/doctors/');
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
        const response = await API.post('/doctors/add', formData);
        setDoctors([...doctors, response.data]);
        setFormData({ name: '', specialty: '' });
        } catch (error) {
        console.error('Error adding doctor:', error);
        }
    };

    const deleteDoctor = async (id) => {
        try {
        await API.delete(`/doctors/delete/${id}`);
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
        const response = await API.post(
            `/doctors/update/${editingDoctor._id}`,
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
        <>
        <div>
                <nav className="navbar">
                <Link to="/appointment" className="nav-link">Appointments</Link>
                <Link to="/doctors" className="nav-link">Doctors</Link>
                <Link to="/patients" className="nav-link">Patients</Link>
                <button className="nav-link logout" onClick={handleLogout}>Logout</button>
                </nav>
            </div>
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
        </>
    );
};

export default Doctor;
