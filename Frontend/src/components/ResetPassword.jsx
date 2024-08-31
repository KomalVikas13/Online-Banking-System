import React, { useState } from "react";
import "../styling/ResetPassword.css"

const ResetPassword = () => {
    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        successMsg: "",
    });

    const [formError, setFormError] = useState({
        email: "",
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

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                error = "Enter a valid email address";
            }
        }

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
            email: "",
            password: "",
            confirmPassword: "",
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
        if (!inputError.email && !inputError.password && !inputError.confirmPassword) {
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
        <div className="container mx-0 p-0">
            <div className="card">
                <div className="card-header">
                    <div className="title">Reset Password</div>
                </div>

                <div className="card-body">
                    <form onSubmit={validateFormInput}>
                        <p className="label">Email</p>
                        <input
                            value={formInput.email}
                            onChange={({ target }) => handleUserInput(target.name, target.value)}
                            onBlur={({ target }) => validateInput(target.name, target.value)}
                            name="email"
                            type="text"
                            className="input"
                            placeholder="Enter email"
                        />
                        <p className="error-message">{formError.email}</p>

                        <p className="label">Password</p>
                        <input
                            value={formInput.password}
                            onChange={({ target }) => handleUserInput(target.name, target.value)}
                            onBlur={({ target }) => validateInput(target.name, target.value)}
                            name="password"
                            type="password"
                            className="input"
                            placeholder="Enter Password"
                        />
                        <p className="error-message">{formError.password}</p>

                        <p className="label">Confirm Password</p>
                        <input
                            value={formInput.confirmPassword}
                            onChange={({ target }) => handleUserInput(target.name, target.value)}
                            onBlur={({ target }) => validateInput(target.name, target.value)}
                            name="confirmPassword"
                            type="password"
                            className="input"
                            placeholder="Enter Confirm Password"
                        />
                        <p className="error-message">{formError.confirmPassword}</p>
                        <p className="success-message">{formInput.successMsg}</p>

                        <input type="submit" className="btn" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
