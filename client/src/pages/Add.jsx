import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Add = () => {
    const [formData, setFormData] = useState({
        Branch: "",
        Gender: "",
        Category: '',
        University: "",
        University_Type: "",
        College: "",
        Year: 0,
        Cutoff: 0,
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
            await axios.post(`http://127.0.0.1:8000/api/save-data/`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success("Application Sent Successfully, Your Request Will be processed By Admin");
            setFormData({
                Branch: "",
                Gender: "",
                Category: '',
                University: "",
                University_Type: "",
                College: "",
                Year: 0,
                Cutoff: 0,
            });
        } catch (error) {
            toast.error("Unable to send application");
            console.error('Error:', error);
        }
    };

    return (
        <div className="mx-auto max-w-lg">
            <div className='text-2xl text-gray-700 font-bold my-10'>Add new Data</div>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
                <input type="text" name="Branch" value={formData.Branch} onChange={handleChange} placeholder="Branch" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="text" name="Gender" value={formData.Gender} onChange={handleChange} placeholder="Gender" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="text" name="Category" value={formData.Category} onChange={handleChange} placeholder="Category" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="text" name="University" value={formData.University} onChange={handleChange} placeholder="University" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="text" name="University_Type" value={formData.University_Type} onChange={handleChange} placeholder="University Type" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="text" name="College" value={formData.College} onChange={handleChange} placeholder="College" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="number" name="Year" value={formData.Year} onChange={handleChange} placeholder="Year" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="number" name="Cutoff" value={formData.Cutoff} onChange={handleChange} placeholder="Cutoff" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <button type="submit" className="block w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
            </form>
        </div>
    )
}

export default Add;
