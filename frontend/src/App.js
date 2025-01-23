import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ChangePassword from './components/ChangePassword';
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import Appointment from './components/Appointment';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
      <div className='form-container'>
        <Routes>
            <Route path="/" element={<SignUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/change-password" element={<ChangePassword/>} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/doctors" element={<Doctor />} />
            <Route path="/patients" element={<Patient />} />
          </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
