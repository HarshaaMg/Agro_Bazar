import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    password: '',
    re_entered_password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/user`, formData, {
        withCredentials: true
      });

      alert(res.data.message || "Registered!");
      navigate("/login"); // Redirect after successful registration
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl mx-auto shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row bg-white">
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="/crop.png"
            alt="Crop Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-800 bg-opacity-30"></div>
        </div>

        {/* Register Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="flex items-center space-x-2 justify-center mb-6">
              <img src="/agro_bazar_logo.png" alt="Agro Bazar Logo" className="h-12 w-auto" />
              <span className="text-2xl font-bold text-green-700">Agro Bazar</span>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center">Create your account</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Mobile Number or Email</label>
                <input
                  type="text"
                  id="contact"
                  placeholder="Enter mobile or email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="confirm">Confirm Password</label>
                <input
                  type="password"
                  id="re_entered_password"
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={formData.re_entered_password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="text-center text-sm mt-4 text-gray-600">
              Already have an account?
              <Link to="/login" className="text-green-700 font-semibold hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
