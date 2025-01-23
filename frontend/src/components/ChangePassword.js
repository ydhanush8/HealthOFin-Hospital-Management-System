import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../Api';
import { toast } from 'react-toastify';
import '../App.css'
import { Link } from 'react-router-dom';



const ChangePassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await API.post('/user/change-password', { token, newPassword, oldPassword, email });
        toast.success('Password reset successful!');
        } catch (err) {
        toast.error(err.response?.data?.message || 'Error resetting password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
        />
        <h4>If you have'nt already SignedIn, <Link to='/signin' className='link'>SignIn</Link> </h4>
        <button type="submit">Change Password</button>
        </form>
    );
};

export default ChangePassword;
