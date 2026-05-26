import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [role, setRole] = useState("patient");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Registration Successful");

    navigate("/");
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">

      <div className="bg-white w-[450px] p-10 rounded-3xl shadow-2xl">

        
        

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-700">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join OncoVision AI Platform
          </p>

        </div>

        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl mb-4"
        >

          <option value="patient">
            Patient
          </option>

          <option value="doctor">
            Doctor
          </option>

        </select>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl mb-4"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl mb-4"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl mb-6"
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-6">

          Already have an account?

          <Link
            to="/"
            className="text-blue-600 font-semibold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}