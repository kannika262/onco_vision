import React from "react";

import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const hospitals = [
    "Apollo Hospital",
    "AIIMS Delhi",
    "Manipal Hospital",
    "Fortis Healthcare"
  ];

  const doctors = [
    {
      name: "Dr. Mehta",
      department: "Oncology",
      status: "Active"
    },
    {
      name: "Dr. Sharma",
      department: "Radiology",
      status: "Online"
    }
  ];

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-blue-700">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Central AI Healthcare Management System
          </p>

        </div>

        <button

          onClick={() =>
            navigate("/hospital-details")
          }

          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-2xl
            transition
          "
        >
          View Network
        </button>

      </div>

      <div className="p-8">

        {/* Top Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-lg text-gray-500">
              Registered Patients
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-4">
              2,430
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-lg text-gray-500">
              Active Doctors
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-4">
              128
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-lg text-gray-500">
              AI Accuracy
            </h2>

            <p className="text-5xl font-bold text-purple-600 mt-4">
              94%
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-lg text-gray-500">
              High Risk Cases
            </h2>

            <p className="text-5xl font-bold text-red-600 mt-4">
              34
            </p>

          </div>

        </div>

        {/* Management Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

          {/* Patients */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Patient Management
            </h2>

            <div className="space-y-4">

              <div className="border p-5 rounded-2xl">
                View Patient Records
              </div>

              <div className="border p-5 rounded-2xl">
                Manage Medical History
              </div>

              <div className="border p-5 rounded-2xl">
                Encrypted Record Access
              </div>

            </div>

          </div>

          {/* Doctors */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Doctor Management
            </h2>

            <div className="space-y-5">

              {doctors.map((doc, index) => (

                <div
                  key={index}
                  className="border p-5 rounded-2xl flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-bold text-xl">
                      {doc.name}
                    </h3>

                    <p className="text-gray-500">
                      {doc.department}
                    </p>

                  </div>

                  <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full">
                    {doc.status}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Hospitals + AI Models */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

          {/* Hospitals */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Hospital Network
            </h2>

            <div className="space-y-4">

              {hospitals.map((hospital, index) => (

                <div
                  key={index}
                  className="border p-5 rounded-2xl flex justify-between items-center"
                >

                  <h3 className="font-bold text-lg">
                    {hospital}
                  </h3>

                  <button

                    onClick={() =>
                      navigate("/hospital-details")
                    }

                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      transition
                    "
                  >
                    View
                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* AI Models */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              AI Model Management
            </h2>

            <div className="space-y-5">

              <div className="border p-5 rounded-2xl">

                <div className="flex justify-between items-center">

                  <h3 className="font-bold text-xl">
                    Lung Cancer Model
                  </h3>

                  <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full">
                    Active
                  </span>

                </div>

                <p className="text-gray-500 mt-3">
                  DenseNet121 - Accuracy: 94%
                </p>

              </div>

              <div className="border p-5 rounded-2xl">

                <div className="flex justify-between items-center">

                  <h3 className="font-bold text-xl">
                    Brain Tumor Model
                  </h3>

                  <span className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full">
                    Training
                  </span>

                </div>

                <p className="text-gray-500 mt-3">
                  ResNet50 - Accuracy: 89%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}