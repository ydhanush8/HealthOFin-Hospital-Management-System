import React, { useState } from 'react';
import API from '../Api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await API.post('/user/signup', formData);
        toast.success('SignUp successful!');
        } catch (err) {
        toast.error(err.response?.data?.message || 'Error during registration');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
        />
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
        <h4>If you have already SignedUp, <Link to='/signin' className='link'>SignIn</Link> </h4>
        <button type="submit">SignUp</button>
        </form>
    );
};

export default SignUp;
