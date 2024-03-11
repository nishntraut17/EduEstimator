import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Predict = () => {
    const [formData, setFormData] = useState({
        marks: 0,
        gender: '',
        category: '',
        branch: '',
        home_university: '',
    });
    const [responseData, setResponseData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            console.log(formData);
            const response = await axios.post(`http://127.0.0.1:8000/api/predict/`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setResponseData(response.data);
            toast.success("Application Sent Successfully, Your Request Will be processed By Admin");
        } catch (error) {
            toast.error("Unable to send application");
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-row gap-20 justify-center mt-8">
            <div>
                <img src='./predict.jpg' alt="predict" className="w-full h-96 object-cover rounded-t-lg" />
            </div>
            {!responseData && (
                <div>
                    <form onSubmit={handleSubmit} className="space-y-4 font-semibold text-gray-700 flex flex-col gap-6">
                        <div>
                            <label className="block mb-1">MHTCET Percentile Score:</label>
                            <input
                                type="number"
                                name="marks"
                                value={formData.marks}
                                onChange={handleChange}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter between 0 to 100"
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Gender:</label>
                            <div className="flex">
                                <input type="radio" id="male" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} className="mr-2" />
                                <label htmlFor="male" className="mr-4">Male</label>
                                <input type="radio" id="female" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} className="mr-2" />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1">Caste:</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="">Select caste</option>
                                <option value="OPEN">Open</option>
                                <option value="OBC">OBC</option>
                                <option value="ST">ST</option>
                                <option value="SC">SC</option>
                                <option value="NT1">NT1</option>
                                <option value="NT2">NT2</option>
                                <option value="NT3">NT3</option>
                                <option value="VJ">VJ</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1">Branch:</label>
                            <select name="branch" value={formData.branch} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="">Select branch</option>
                                <option value="Computer">Computer</option>
                                <option value="ENTC">Electronics and Telecommunication</option>
                                <option value="IT">Information Technology</option>
                                <option value="Civil">Civil</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Instrumentation">Instrumentation</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="AIDS">Artificial Intelligence and Data Science</option>
                                <option value="Chemical">Chemical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1">Home University:</label>
                            <select
                                name="home_university"
                                value={formData.home_university}
                                onChange={handleChange}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select home university</option>
                                <option value="RTMNU">Rashtrasant Tukadoji Maharaj Nagpur University</option>
                                <option value="MUy">Mumbai University</option>
                                <option value="SPPU">Savitribai Phule Pune University</option>
                            </select>
                        </div>

                        <button type="submit" className="block w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                    </form>
                </div>
            )}

            {responseData && (
                <div className="bg-white shadow-md rounded px-8 py-6 mt-20">
                    <h2 className="text-3xl font-bold mb-4 ">Prediction</h2>
                    <div className="mb-6">
                        <p className="text-lg mb-2">Marks: {responseData.marks}</p>
                        <p className="text-lg mb-2">Cutoff of colleges:</p>
                        <ul className="list-disc ml-6 mb-4">
                            {Object.entries(responseData.predictions).map(([college, prediction]) => (
                                <li key={college} className="text-lg">{college}: {prediction}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-lg mb-2">Colleges you can get:</p>
                        <ul className="list-disc ml-6">
                            {responseData.eligible_colleges.map(college => (
                                <li key={college} className="text-lg">{college}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Predict;
