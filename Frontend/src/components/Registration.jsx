import React, { useState } from 'react';
import register from '../assets/images/Register.png';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    panCardNumber: '',
    aadharCardNumber: '',
    customerGender: '',
    customerEmail: '',
    customerMobileNo: '',
    customerAddress: '',
    accountType: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const validateMobileNo = (mobileNo) => {
    const mobileNoRegex = /^[0-9]{10}$/;
    return mobileNoRegex.test(mobileNo);
  };

  const validatePanCard = (panCardNumber) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(panCardNumber);
  };

  const validateAadharCard = (aadharCardNumber) => {
    const aadharRegex = /^[0-9]{12}$/;
    return aadharRegex.test(aadharCardNumber);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    let error = '';
    if (!value.trim()) {
      error = `${name} is required`;
    } else {
      if (name === 'customerEmail' && !validateEmail(value)) {
        error = 'Invalid email address. Must be a @gmail.com email.';
      } else if (name === 'dob' && !validateAge(value)) {
        error = 'Age must be above 18.';
      } else if (name === 'customerMobileNo' && !validateMobileNo(value)) {
        error = 'Mobile number must be 10 digits.';
      } else if (name === 'panCardNumber' && !validatePanCard(value)) {
        error = 'Invalid PAN Card Number.';
      } else if (name === 'aadharCardNumber' && !validateAadharCard(value)) {
        error = 'Aadhar Card Number must be 12 digits.';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email address. Must be a @gmail.com email.';
    }
    if (!validateAge(formData.dob)) {
      newErrors.dob = 'Age must be above 18.';
    }
    if (!validateMobileNo(formData.customerMobileNo)) {
      newErrors.customerMobileNo = 'Mobile number must be 10 digits.';
    }
    if (!validatePanCard(formData.panCardNumber)) {
      newErrors.panCardNumber = 'Invalid PAN Card Number.';
    }
    if (!validateAadharCard(formData.aadharCardNumber)) {
      newErrors.aadharCardNumber = 'Aadhar Card Number must be 12 digits.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // If no errors, perform form submission logic
      console.log('Form submitted:', formData);
      // axios.post('http://localhost:8080/dummy/api/register', formData)
      //   .then(response => console.log(response))
      //   .catch(error => console.log(error));
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
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
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
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
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
                name="dob"
                value={formData.dob}
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
                name="panCardNumber"
                placeholder="Enter your PAN Card Number"
                value={formData.panCardNumber}
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
                name="aadharCardNumber"
                placeholder="Enter your Aadhar Card Number"
                value={formData.aadharCardNumber}
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
