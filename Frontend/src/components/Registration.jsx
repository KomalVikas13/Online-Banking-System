import React, { useEffect, useState } from 'react';
import register from '../assets/images/Register.png';
import axios from 'axios';
import formRules from '../formRules';
const Registration = () => {
  const [formData, setFormData] = useState({
      customerFirstName : "",
      customerLastName : "",
      customerDateOfBirth : "",
      customerPANCardNumber : "",
      customerAadharCardNumber : "",
      customerGender : "",
      customerEmail : "",
      customerMobileNo : "",
      customerAddress : "",
      customerRegistrationDate : "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    const {id} = e.target
    let error = formRules.registrationFormRules(e);
    console.log(error)

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email address. Must be a @gmail.com email.';
    }
    if (!validateAge(formData.customerDateOfBirth)) {
      newErrors.customerDateOfBirth = 'Age must be above 18.';
    }
    if (!validateMobileNo(formData.customerMobileNo)) {
      newErrors.customerMobileNo = 'Mobile number must be 10 digits.';
    }
    if (!validatePanCard(formData.customerPANCardNumber)) {
      newErrors.customerPANCardNumber = 'Invalid PAN Card Number.';
    }
    if (!validateAadharCard(formData.customerAadharCardNumber)) {
      newErrors.customerAadharCardNumber = 'Aadhar Card Number must be 12 digits.';
    }

    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors)
      setErrors(() => newErrors);
    } else {
      console.log(formData)
        const response = axios.post("http://localhost:9999/customer/register",formData)
        console.log(response)
    }
  };

  return (
      <div className="bg-white flex justify-around">
        <div className="w-1/2 p-5">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Sign up</h2>
                    <p className="text-sm text-gray-600 text-center mb-8">
                        Please enter your details.
                    </p>
          <form onSubmit={handleSubmit} className='w-[80%] mx-auto'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="customerFirstName"
                  placeholder="Enter your first name"
                  value={formData.customerFirstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="customerLastName"
                  placeholder="Enter your last name"
                  value={formData.customerLastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="customerDateOfBirth"
                value={formData.customerDateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="panCardNumber" className="block text-sm font-medium text-gray-700">PAN Card Number</label>
              <input
                type="text"
                id="panCardNumber"
                name="customerPANCardNumber"
                placeholder="Enter your PAN Card Number"
                value={formData.customerPANCardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.panCardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.panCardNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="aadharCardNumber" className="block text-sm font-medium text-gray-700">Aadhar Card Number</label>
              <input
                type="text"
                id="aadharCardNumber"
                name="customerAadharCardNumber"
                placeholder="Enter your Aadhar Card Number"
                value={formData.customerAadharCardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.aadharCardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.aadharCardNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="customerGender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="customerGender"
                name="customerGender"
                value={formData.customerGender}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.customerGender && (
                <p className="text-red-500 text-sm mt-1">{errors.customerGender}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                placeholder="Enter your email"
                value={formData.customerEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.customerEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="customerMobileNo" className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="tel"
                id="customerMobileNo"
                name="customerMobileNo"
                placeholder="Enter your mobile number"
                value={formData.customerMobileNo}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.customerMobileNo && (
                <p className="text-red-500 text-sm mt-1">{errors.customerMobileNo}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="customerAddress"
                name="customerAddress"
                placeholder="Enter your address"
                value={formData.customerAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.customerAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.customerAddress}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type</label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Account Type</option>
                <option value="saving">Saving</option>
                <option value="current">Current</option>
                <option value="fixed-deposit">Fixed Deposit</option>
                <option value="loan">Loan Account</option>
              </select>
              {errors.accountType && (
                <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>
              )}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign up</button>
          </form>
          <p className="text-center text-gray-600 mt-4">Already have an account? <a href="#" className="text-blue-500 hover:underline">Login</a></p>
        </div>
        <div className="w-1/2 bg-contain bg-no-repeat" style={{ backgroundImage: `url('${register}')` }}></div>
      </div>
  );
};

export default Registration;
