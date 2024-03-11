import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/user/login/`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.setItem('token', response.data.token);
            toast.success("Login successful");
            setFormData({
                email: "",
                password: ""
            });
        } catch (error) {
            toast.error("Unable to login");
            console.error('Error:', error);
        }
    };

    return (
        <div className="mx-auto max-w-lg">
            <div className='text-2xl text-gray-700 font-bold my-10'>Login</div>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <button type="submit" className="block w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
            </form>
        </div>
    )
}

export default Login;
