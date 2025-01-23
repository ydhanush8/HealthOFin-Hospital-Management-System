import React, { useState } from 'react';
import API from '../Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const { data } = await API.post('/user/signin', formData);
        localStorage.setItem('token', data.token);
        toast.success('SignIn successful!');
        navigate('/appointment');
        } catch (err) {
        toast.error(err.response?.data?.message || 'Error during login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
        />
        <h4>If you have't SignedUp, <Link to='/' className='link'>SignUp</Link> </h4>
        <h4>If you forgot your password, <Link to='/change-password' className='link'>Change Password</Link> </h4>
        <button type="submit">SignIn</button>

        </form>
    );
};

export default SignIn;
