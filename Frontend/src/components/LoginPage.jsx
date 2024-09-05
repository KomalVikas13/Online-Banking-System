import React, { useState } from 'react';
import Login from '../assets/images/Logo.png';

const LoginPage = () => {
    const [customerId, setCustomerId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateCustomerId = (id) => {
        const regex = /^\d{6,}$/; // Customer ID should be a number with at least 6 digits
        return regex.test(id);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
        return regex.test(password);
    };

    const handleBlur = (field) => {
        const newErrors = { ...errors };

        if (field === 'customerId') {
            if (!validateCustomerId(customerId)) {
                newErrors.customerId = 'Customer ID is required';
            } else {
                delete newErrors.customerId;
            }
        }

        if (field === 'password') {
            if (!validatePassword(password)) {
                newErrors.password = 'Password is required';
            } else {
                delete newErrors.password;
            }
        }

        setErrors(newErrors);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateCustomerId(customerId)) {
            newErrors.customerId = 'Customer ID must be a number with at least 6 digits.';
        }

        if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        console.log('Login:', { customerId, password });
    };

    const handleForgotPassword = () => {
        console.log('Forgot Password');
    };

    const handleNewUser = () => {
        console.log('New User Registration');
    };

    return (
        <div className=" bg-gray-100">
             {/* <div className="flex bg-white rounded-lg shadow-lg overflow-hidden 4x w-full"> */}
            <div className="bg-white  flex  justify-center items-center mx-full w-full h-screen ">
                <div className="w-1/2 p-5">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Log in</h2>
                    <p className="text-sm text-gray-600 text-center mb-8">
                        Welcome back! Please enter your details.
                    </p>

                    <form onSubmit={handleLogin} className=" bg-white border-0 shadow-none w-[80%] mx-auto">
                        <div className="my-3">
                            <label className="block text-sm font-medium text-gray-700">Customer ID:</label>
                            <input
                                type="text"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                onBlur={() => handleBlur('customerId')}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.customerId && <p className="text-red-500 text-xs mt-1">{errors.customerId}</p>}
                        </div>

                        <div className="my-3">
                            <label className="block text-sm font-medium text-gray-700">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => handleBlur('password')}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between my-3">
                            <a href="#" onClick={handleForgotPassword} className="text-sm font-medium text-indigo-600 hover:underline">Forgot Password?</a>
                            <a href="#" onClick={handleNewUser} className="text-sm font-medium text-indigo-600  hover:underline">New User? Sign up</a>
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </form>
                </div>

                <div className="w-1/2  ">
                    <img
                        src={Login}
                        alt="Logo"
                        className="w-3/4 mx-auto"
                    />
                </div>
            </div>
         </div>
    );
};

export default LoginPage;
