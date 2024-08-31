import React, { useState } from 'react';
import "../styling/LoginPage.css"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login:', { email, password });
    };

    const handleForgotPassword = () => {
        // Handle forgot password logic here
        console.log('Forgot Password');
    };

    const handleNewUser = () => {
        // Handle new user registration logic here
        console.log('New User Registration');
    };

    return (
        <div className="login-container">
            <h2>Online Banking System</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="additional-options">
                <button onClick={handleForgotPassword}>Forgot Password?</button>
                <button onClick={handleNewUser}>New User? Register</button>
            </div>
        </div>
    );
};

export default LoginPage;
