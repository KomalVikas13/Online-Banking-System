import React, { useState } from "react";

const EmailPage = () => {
    const [formInput, setFormInput] = useState({
        email: "",
        successMsg: "",
    });

    const [formError, setFormError] = useState({
        email: "",
    });

    const handleUserInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    const validateInput = (name, value) => {
        let error = "";

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                error = "Enter a valid email address";
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
            email: "",
        };

        // Validate email
        if (!formInput.email) {
            inputError.email = "Enter a valid email address";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formInput.email)) {
                inputError.email = "Enter a valid email address";
            }
        }

        // If there are no errors, show success message
        if (!inputError.email) {
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
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Request OTP</h2>
                <p className="text-sm text-gray-600 mb-8">
                Please enter the email address used during registration.<br/>
                A One-Time Password (OTP) will be sent to this email address.
                </p>
                <form onSubmit={validateFormInput}>
                    <label className="block text-sm font-medium text-gray-600 mt-3">Email</label>
                    <input
                        value={formInput.email}
                        onChange={({ target }) => handleUserInput(target.name, target.value)}
                        onBlur={({ target }) => validateInput(target.name, target.value)}
                        name="email"
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter email"
                    />
                    <p className="text-xs text-red-500 mt-1">{formError.email}</p>

                    <p className="text-sm text-green-500 mt-2">{formInput.successMsg}</p>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Request OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailPage;
