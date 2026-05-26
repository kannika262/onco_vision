import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
export default function Login() {

  const [role, setRole] = useState("patient");

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = () => {

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  if (role === "patient") {
    navigate("/patient");
  }

  else if (role === "doctor") {
    navigate("/doctor");
  }

  else if (role === "admin") {
    navigate("/admin");
  }
};

  return (
    

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">

      <div className="bg-white w-[420px] p-10 rounded-3xl shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-5xl font-bold text-blue-700">
            OncoVision AI
          </h1>

          <p className="text-gray-500 mt-3">
            AI-Based Early Cancer Detection Platform
          </p>

        </div>

        {/* Role Selection */}
        <div className="mb-5">

          <label className="block text-gray-700 mb-2 font-semibold">
            Select Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl"
          >

            <option value="patient">
              Patient
            </option>

            <option value="doctor">
              Doctor
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

        </div>

        {/* Email */}
        <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border border-gray-300 p-3 rounded-xl mb-4"
/>

        {/* Password */}
        <input
  type="password"
  placeholder="Enter Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border border-gray-300 p-3 rounded-xl mb-6"
/>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition"
        >
          Login
        </button>


        <p className="text-center text-gray-500 mt-6">

  Don't have an account?

  <Link
    to="/register"
    className="text-blue-600 font-semibold ml-2"
  >
    Register
  </Link>

</p>

      </div>

    </div>
  );
}