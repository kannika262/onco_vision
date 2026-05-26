import React from "react";

import { Link } from "react-router-dom";

export default function PatientDashboard() {

  const report = JSON.parse(
    localStorage.getItem("latestReport")
  );

  const notes = localStorage.getItem("doctorNotes");

  const reports = [
    {
      id: 1,
      scan: "Chest X-Ray",
      risk: "High",
      date: "25 May 2026",
      doctor: "Dr. Mehta"
    },
    {
      id: 2,
      scan: "Brain MRI",
      risk: "Moderate",
      date: "10 April 2026",
      doctor: "Dr. Sharma"
    }
  ];

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-blue-700">
            Patient Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            AI-Based Cancer Detection Platform
          </p>

        </div>

        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl">
          Logout
        </button>

      </div>

      <div className="p-8">

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <Link to="/upload">

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer">

              <h2 className="text-2xl font-bold text-blue-700">
                Upload Scan
              </h2>

              <p className="text-gray-500 mt-3">
                Upload MRI, CT, X-Ray & DICOM files
              </p>

            </div>

          </Link>

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold text-green-600">
              Final Reports
            </h2>

            <p className="text-5xl font-bold mt-4">
              {report ? "1" : "0"}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold text-red-600">
              High Risk Alerts
            </h2>

            <p className="text-5xl font-bold mt-4">
              {report?.report?.severity === "High" ? "1" : "0"}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold text-purple-600">
              Consultations
            </h2>

            <p className="text-5xl font-bold mt-4">
              5
            </p>

          </div>

        </div>

        {/* Latest AI Report */}
        {
          report && (

            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 mb-10">

              <h2 className="text-3xl font-bold text-blue-700 mb-6">
                Latest AI Report
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">

                <div>
                  <p>
                    <strong>Prediction:</strong> {report.prediction}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Confidence:</strong> {report.confidence}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Scan Type:</strong> {report.scan_type}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Severity:</strong> {report?.report?.severity}
                  </p>
                </div>

              </div>

              <div className="mt-6">

                <Link to="/report">

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
                    Open Full Report
                  </button>

                </Link>

              </div>

            </div>

          )
        }

        {/* Scan History */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Scan History
            </h2>

            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
              Historical Reports
            </span>

          </div>

          <div className="space-y-6">

            {reports.map((item) => (

              <div
                key={item.id}
                className="border rounded-2xl p-6 flex flex-col md:flex-row justify-between md:items-center"
              >

                <div>

                  <h3 className="text-2xl font-bold">
                    {item.scan}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Date: {item.date}
                  </p>

                  <p className="text-gray-500">
                    Verified By: {item.doctor}
                  </p>

                </div>

                <div className="flex gap-4 mt-5 md:mt-0">

                  <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full h-fit">
                    {item.risk} Risk
                  </span>

                  <Link to="/report">

                    <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl">
                      Open Report
                    </button>

                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Heatmaps + Doctor Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

          {/* Heatmap */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              AI Heatmap
            </h2>

            {
              report?.heatmap ? (

                <img
                  src={`http://127.0.0.1:8000/${report.heatmap}`}
                  alt="heatmap"
                  className="rounded-2xl shadow-lg"
                />

              ) : (

                <img
                  src="https://via.placeholder.com/500/ff4444/ffffff"
                  alt="heatmap"
                  className="rounded-2xl shadow-lg"
                />

              )
            }

            <p className="text-gray-500 mt-4">
              Suspicious regions detected using Grad-CAM
            </p>

          </div>

          {/* Doctor Notes */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Doctor Notes
            </h2>

            {
              notes ? (

                <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl">

                  <h3 className="font-bold text-lg text-blue-700">
                    Latest Doctor Notes
                  </h3>

                  <p className="text-gray-700 mt-3 leading-7">
                    {notes}
                  </p>

                </div>

              ) : (

                <div className="bg-gray-50 p-5 rounded-2xl border">

                  <p className="text-gray-500">
                    No doctor notes available yet.
                  </p>

                </div>

              )
            }

          </div>

        </div>

      </div>

    </div>

  );
}