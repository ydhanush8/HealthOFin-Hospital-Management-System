import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import Appointment from './components/Appointment';
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="nav-link">Appointments</Link>
          <Link to="/doctors" className="nav-link">Doctors</Link>
          <Link to="/patients" className="nav-link">Patients</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Appointment />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/patients" element={<Patient />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
