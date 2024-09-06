import React, { useState } from "react";

const OTPPage = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [formError, setFormError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Handles change for each OTP input
    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Prevents more than one character
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus on the next input field if the current one is filled
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const validateOtp = () => {
        if (otp.some((digit) => digit === "")) {
            setFormError("Please enter all 6 digits of the OTP.");
        } else {
            setFormError("");
            setSuccessMsg("OTP Verified Successfully!");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateOtp();
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Verify OTP</h2>
                <p className="text-sm text-gray-600 text-center mb-8">
                    A One-Time Password (OTP) has been sent to your email. Please enter the OTP below to verify your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center space-x-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                value={digit}
                                onChange={({ target }) => handleOtpChange(index, target.value)}
                                className="w-10 h-10 border border-gray-300 rounded-lg text-center text-xl focus:ring-blue-500 focus:border-blue-500"
                                maxLength="1"
                            />
                        ))}
                    </div>
                    {formError && <p className="text-xs text-red-500 text-center">{formError}</p>}
                    <p className="text-sm text-green-500 text-center">{successMsg}</p>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
                    >
                        Verify OTP
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Didn't receive the OTP? <a href="#" onClick={() => alert('Resending OTP...')} className="text-indigo-600 hover:underline">Resend OTP</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default OTPPage;
