// frontend/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f2027] via-[#317479] to-[#173b4b]">
      <form
        onSubmit={handleSubmit}
        className="bg-teal-900 bg-opacity-10 backdrop-blur-md rounded-2xl p-8 w-80 shadow-lg space-y-5 text-white"
      >
        <div className="flex justify-center">
          <div className="bg-teal-950 bg-opacity-30 rounded-full p-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 16v-2a4 4 0 00-3-3.87M3 6v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div className="flex items-center bg-teal-800 bg-opacity-20 rounded px-3 py-2">
          <FaUser className="text-white mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-transparent w-full text-white placeholder-white outline-none"
            required
          />
        </div>

        <div className="flex items-center bg-teal-800 bg-opacity-20 rounded px-3 py-2">
          <FaLock className="text-white mr-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="bg-transparent w-full text-white placeholder-white outline-none"
            required
          />
        </div>

        <div className="flex justify-between text-sm">
          <label>
            <input type="checkbox" className="mr-1" /> Remember me
          </label>
          <a href="#" className="hover:underline text-gray-200">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-teal-700 py-2 rounded hover:opacity-90 transition"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
