import React from 'react'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='p-20'>
            <div className='flex flex-col sm:flex-row justify-center'>
                <div className='w-3/5 flex flex-col gap-10'>
                    <h1 className='text-3xl text-gray-800 font-bold'>Unlock Your College Future: Predict Your Admission Chances with Ease!</h1>
                    <p className='hidden sm:block text-lg text-gray-700 font-semibold'>Welcome to our College Admission Prediction Tool! Our web application helps students make informed decisions about their college choices by predicting their chances of admission to various institutions. Simply input your MHTCET percentile score, gender, category, preferred branch, and home university, and let our tool provide you with personalized insights into your admission prospects. With our predictive analysis, you can optimize your application strategy, reduce stress, and maximize your chances of securing admission to your dream college. Start exploring your college options today with our intuitive and user-friendly prediction tool!</p>
                </div>
                <div className='w-2/5'>
                    <img src="./home.jpg" alt="goal" />
                </div>
            </div>
            <Link to='/predict'>
                <button className='bg-blue-600 border-blue-700 hover:bg-blue-700 p-2 rounded-md text-white'>College Predictor <ArrowOutwardIcon /></button>
            </Link>
        </div>
    )
}

export default Home