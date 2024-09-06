import React, { useState } from "react";

const ResetPassword = () => {
    const [formInput, setFormInput] = useState({
        password: "",
        confirmPassword: "",
        successMsg: "",
    });

    const [formError, setFormError] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleUserInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    const validateInput = (name, value) => {
        let error = "";

        if (name === "password") {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!value) {
                error = "Password should not be empty";
            } else if (!passwordRegex.test(value)) {
                error =
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
            }
        }

        if (name === "confirmPassword") {
            if (value !== formInput.password) {
                error = "Password and confirm password should match";
            }
        }

        setFormError((prevError) => ({
            ...prevError,
            [name]: error,
        }));
    };

    const validateFormInput = (event) => {
        event.preventDefault();

        let inputError = {
            password: "",
            confirmPassword: "",
        };

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!formInput.password) {
            inputError.password = "Password should not be empty";
        } else if (!passwordRegex.test(formInput.password)) {
            inputError.password =
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }

        // Validate confirm password
        if (formInput.password && formInput.confirmPassword !== formInput.password) {
            inputError.confirmPassword = "Password and confirm password should match";
        }

        // If there are no errors, show success message
        if (!inputError.password && !inputError.confirmPassword) {
            setFormInput((prevState) => ({
                ...prevState,
                successMsg: "Validation Success",
            }));
        } else {
            setFormInput((prevState) => ({
                ...prevState,
                successMsg: "",
            }));
        }

        setFormError(inputError);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Reset Password</h2>
                <form onSubmit={validateFormInput}>

                    <label className="block text-sm font-medium text-gray-700 mt-3">Password</label>
                    <input
                        value={formInput.password}
                        onChange={({ target }) => handleUserInput(target.name, target.value)}
                        onBlur={({ target }) => validateInput(target.name, target.value)}
                        name="password"
                        type="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter Password"
                    />
                    <p className="text-xs text-red-500 mt-1">{formError.password}</p>

                    <label className="block text-sm font-medium text-gray-700 mt-3">Confirm Password</label>
                    <input
                        value={formInput.confirmPassword}
                        onChange={({ target }) => handleUserInput(target.name, target.value)}
                        onBlur={({ target }) => validateInput(target.name, target.value)}
                        name="confirmPassword"
                        type="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter Confirm Password"
                    />
                    <p className="text-xs text-red-500 mt-1">{formError.confirmPassword}</p>
                    <p className="text-sm text-green-500 mt-2">{formInput.successMsg}</p>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
