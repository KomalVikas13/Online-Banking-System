import React, { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    customerGender: '',
    customerEmail: '',
    customerMobileNo: '',
    customerAddress: '',
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

  const validateAge = (age) => {
    return age >= 18;
  };

  const validateMobileNo = (mobileNo) => {
    const mobileNoRegex = /^[0-9]{10}$/;
    return mobileNoRegex.test(mobileNo);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    let error = '';
    if (!value.trim()) {
      error = `${name} is required`;
    } else {
      if (name === 'customerEmail' && !validateEmail(value)) {
        error = 'Invalid email address. Must be a @gmail.com email.';
      } else if (name === 'age' && !validateAge(Number(value))) {
        error = 'Age must be above 18.';
      } else if (name === 'customerMobileNo' && !validateMobileNo(value)) {
        error = 'Mobile number must be 10 digits.';
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
    if (!validateAge(Number(formData.age))) {
      newErrors.age = 'Age must be above 18.';
    }
    if (!validateMobileNo(formData.customerMobileNo)) {
      newErrors.customerMobileNo = 'Mobile number must be 10 digits.';
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex md:w-3/4">
        <div className="md:w-1/2 p-8">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Horizon</h2>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Sign up</h3>
          <p className="text-gray-600 mb-6">Please enter your details.</p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700">First Name</label>
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
                <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
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
              <label htmlFor="age" className="block text-gray-700">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="customerGender" className="block text-gray-700">Gender</label>
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
              <label htmlFor="customerEmail" className="block text-gray-700">Email</label>
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
              <label htmlFor="customerMobileNo" className="block text-gray-700">Mobile Number</label>
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
              <label htmlFor="customerAddress" className="block text-gray-700">Address</label>
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
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign up</button>
          </form>
          <p className="text-center text-gray-600 mt-4">Already have an account? <a href="#" className="text-blue-500 hover:underline">Login</a></p>
        </div>
        <div className="hidden md:block md:w-1/2 bg-cover" style={{ backgroundImage: `url('../assets/images/Register.png')` }}></div>
      </div>
    </div>
  );
};

export default Registration;
