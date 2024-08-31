import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import "../styling/Registration.css"

function Registration() {
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
  // const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First Name is required';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = 'Last Name is required';
        }
        break;
      case 'age':
        if (!value || value < 18 || value > 100) {
          error = 'Age must be between 18 and 100';
        }
        break;
      case 'customerGender':
        if (!value) {
          error = 'Gender is required';
        }
        break;
      case 'customerEmail':
        if (!value || !emailRegex.test(value)) {
          error = 'Valid Email is required';
        }
        break;
      case 'customerMobileNo':
        if (!value || !mobileRegex.test(value)) {
          error = 'Valid 10-digit Mobile Number is required';
        }
        break;
      case 'customerAddress':
        if (!value.trim()) {
          error = 'Address is required';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const validate = () => {
    const errors = {};
    Object.keys(formData).forEach((name) => {
      const error = validateField(name, formData[name]);
      if (error) errors[name] = error;
    });
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:8080/dummy/api/register', formData);
      console.log("form data=", formData);
      if (response.status === 200) {
        alert('Registration successful!');
        setFormData({
          firstName: '',
          lastName: '',
          age: '',
          customerGender: '',
          customerEmail: '',
          customerMobileNo: '',
          customerAddress: '',
        });
        // navigate('/login');  // Replace with the path to your login page
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <>
      {/* <h1 className="text-3xl text-darkBulish bg-lightBlusih font-bold underline">
        Hello world!
      </h1> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div>
          <label>Gender:</label>
          <select
            name="customerGender"
            value={formData.customerGender}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.customerGender && <p className="error">{errors.customerGender}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.customerEmail && <p className="error">{errors.customerEmail}</p>}
        </div>

        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="customerMobileNo"
            value={formData.customerMobileNo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.customerMobileNo && <p className="error">{errors.customerMobileNo}</p>}
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.customerAddress && <p className="error">{errors.customerAddress}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Registration;
