import React from "react";
export default function AdminDashboard() {

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

        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl">
          Logout
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

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
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

        {/* Analytics */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

          <h2 className="text-3xl font-bold mb-8">
            Platform Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-gray-50 border rounded-2xl p-6">

              <h3 className="text-lg text-gray-500">
                Daily Predictions
              </h3>

              <p className="text-4xl font-bold text-blue-600 mt-4">
                1,245
              </p>

            </div>

            <div className="bg-gray-50 border rounded-2xl p-6">

              <h3 className="text-lg text-gray-500">
                Detection Accuracy
              </h3>

              <p className="text-4xl font-bold text-green-600 mt-4">
                94%
              </p>

            </div>

            <div className="bg-gray-50 border rounded-2xl p-6">

              <h3 className="text-lg text-gray-500">
                Doctor Activity
              </h3>

              <p className="text-4xl font-bold text-purple-600 mt-4">
                82%
              </p>

            </div>

            <div className="bg-gray-50 border rounded-2xl p-6">

              <h3 className="text-lg text-gray-500">
                Platform Usage
              </h3>

              <p className="text-4xl font-bold text-red-600 mt-4">
                12K
              </p>

            </div>

          </div>

        </div>

        {/* Federated Learning */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

          <h2 className="text-3xl font-bold mb-6">
            Federated Learning Simulation
          </h2>

          <p className="text-gray-600 leading-8 text-lg">

            Hospital-wise collaborative AI training enables
            decentralized learning without sharing sensitive
            patient data across hospitals.

          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold text-blue-700">
                Apollo Hospital
              </h3>

              <p className="mt-3 text-gray-600">
                Local AI Training Active
              </p>

            </div>

            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold text-green-700">
                AIIMS Delhi
              </h3>

              <p className="mt-3 text-gray-600">
                Model Synchronization Complete
              </p>

            </div>

            <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold text-purple-700">
                Fortis
              </h3>

              <p className="mt-3 text-gray-600">
                Federated Update Running
              </p>

            </div>

          </div>

        </div>

        {/* Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Security */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Security & Privacy
            </h2>

            <ul className="space-y-5 text-lg">

              <li className="border-b pb-4">
                AES Encrypted Medical Records
              </li>

              <li className="border-b pb-4">
                Role-Based Access Control
              </li>

              <li className="border-b pb-4">
                Secure API Authentication
              </li>

              <li className="border-b pb-4">
                HIPAA-Compliant Architecture
              </li>

            </ul>

          </div>

          {/* Audit Logs */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Audit Logs & Monitoring
            </h2>

            <div className="space-y-5">

              <div className="border p-5 rounded-2xl">

                <h3 className="font-bold">
                  Doctor Login Activity
                </h3>

                <p className="text-gray-500 mt-2">
                  25 May 2026 - 10:45 AM
                </p>

              </div>

              <div className="border p-5 rounded-2xl">

                <h3 className="font-bold">
                  AI Prediction Generated
                </h3>

                <p className="text-gray-500 mt-2">
                  Chest X-Ray Analysis Completed
                </p>

              </div>

              <div className="border p-5 rounded-2xl">

                <h3 className="font-bold">
                  Security Audit Passed
                </h3>

                <p className="text-gray-500 mt-2">
                  No suspicious access detected
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}