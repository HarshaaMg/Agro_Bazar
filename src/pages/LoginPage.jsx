import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api';

function LoginPage() {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_BASE_URL}/user/login`,
        { contact, password },
        { withCredentials: true } // Send cookie
      );

      alert("Login successful!");
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl mx-auto shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row bg-white">
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="/login_crop.jpg"
            alt="Login Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-800 bg-opacity-30"></div>
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="flex items-center space-x-2 justify-center mb-6">
              <img src="/agro_bazar_logo.png" alt="Agro Bazar Logo" className="h-12 w-auto" />
              <span className="text-2xl font-bold text-green-700">Agro Bazar</span>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center">Login to your account</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="contact">Mobile or Email</label>
                <input
                  type="text"
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter mobile/email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm mt-4 text-gray-600">
              Don't have an account?
              <Link to="/register" className="text-green-700 font-semibold hover:underline"> Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
