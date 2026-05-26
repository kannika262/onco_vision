import React from "react";

import { Link } from "react-router-dom";

export default function DoctorDashboard() {

  // =========================================
  // LOAD REAL PATIENT REPORT
  // =========================================

  const storedReport = JSON.parse(

    localStorage.getItem("latestReport")

  );

  // =========================================
  // DYNAMIC CASES
  // =========================================

  const cases = storedReport

    ? [

        {

          id: "CASE-201",

          patient: "Uploaded Patient",

          scanType:

            storedReport.scan_type === "brain"

              ? "Brain MRI"

              : "Lung X-Ray",

          prediction:

            storedReport.prediction,

          confidence:

            storedReport.confidence,

          risk:

            parseFloat(storedReport.confidence) >= 90

              ? "Critical"

              : parseFloat(storedReport.confidence) >= 70

              ? "High"

              : "Low",

          status:

            parseFloat(storedReport.confidence) >= 90

              ? "Emergency"

              : "Pending",

          heatmap:

            storedReport.heatmap,

          scan_type:

            storedReport.scan_type

        }

      ]

    : [];

  // =========================================
  // RISK COLORS
  // =========================================

  const getRiskColor = (risk) => {

    if (risk === "Critical")
      return "bg-red-100 text-red-700";

    if (risk === "High")
      return "bg-orange-100 text-orange-700";

    if (risk === "Low")
      return "bg-green-100 text-green-700";

    return "bg-gray-100 text-gray-700";
  };

  // =========================================
  // STATUS COLORS
  // =========================================

  const getStatusColor = (status) => {

    if (status === "Emergency")
      return "bg-red-600 text-white";

    if (status === "Pending")
      return "bg-yellow-500 text-white";

    if (status === "Approved")
      return "bg-green-600 text-white";

    return "bg-gray-500 text-white";
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-blue-700">

          Doctor Dashboard

        </h1>

        <p className="text-gray-600 mt-3 text-xl">

          AI-Assisted Cancer Diagnosis Management System

        </p>

      </div>

      {/* ========================================= */}
      {/* STATS CARDS */}
      {/* ========================================= */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Total Cases

          </h2>

          <p className="text-4xl font-bold text-blue-700 mt-4">

            {cases.length}

          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Pending Reviews

          </h2>

          <p className="text-4xl font-bold text-yellow-500 mt-4">

            {

              cases.filter(
                (c) => c.status === "Pending"
              ).length

            }

          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Emergency Alerts

          </h2>

          <p className="text-4xl font-bold text-red-600 mt-4">

            {

              cases.filter(
                (c) => c.status === "Emergency"
              ).length

            }

          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Approved Cases

          </h2>

          <p className="text-4xl font-bold text-green-600 mt-4">

            0

          </p>

        </div>

      </div>

      {/* ========================================= */}
      {/* CASE TABLE */}
      {/* ========================================= */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold text-black">

            Patient Cases

          </h2>

          <input

            type="text"

            placeholder="Search patient..."

            className="border border-gray-300 rounded-2xl px-5 py-3 w-72"

          />

        </div>

        {/* ========================================= */}
        {/* TABLE HEADER */}
        {/* ========================================= */}

        <div className="grid grid-cols-8 gap-4 bg-gray-100 p-4 rounded-2xl font-semibold text-gray-700 mb-4">

          <p>Case ID</p>

          <p>Patient</p>

          <p>Scan Type</p>

          <p>Prediction</p>

          <p>Confidence</p>

          <p>Risk</p>

          <p>Status</p>

          <p>Details</p>

        </div>

        {/* ========================================= */}
        {/* CASE ROWS */}
        {/* ========================================= */}

        {

          cases.length > 0 ? (

            cases.map((item) => (

              <div

                key={item.id}

                className="grid grid-cols-8 gap-4 bg-gray-50 p-4 rounded-2xl mb-4 items-center hover:bg-blue-50 transition-all"

              >

                <p className="font-semibold">

                  {item.id}

                </p>

                <p>

                  {item.patient}

                </p>

                <p>

                  {item.scanType}

                </p>

                <p className="font-semibold text-red-600">

                  {item.prediction}

                </p>

                <p>

                  {item.confidence}

                </p>

                <div>

                  <span

                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getRiskColor(item.risk)}`}

                  >

                    {item.risk}

                  </span>

                </div>

                <div>

                  <span

                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(item.status)}`}

                  >

                    {item.status}

                  </span>

                </div>

                <div>

                  <Link

                    to="/case-details"

                    state={{

                      caseData: item

                    }}

                  >

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md">

                      View

                    </button>

                  </Link>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center py-16 text-gray-500 text-2xl">

              No Patient Cases Available

            </div>

          )

        }

      </div>

      {/* ========================================= */}
      {/* QUICK ACTIONS */}
      {/* ========================================= */}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        <button className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-3xl shadow-xl text-xl font-semibold">

          Review Emergency Cases

        </button>

        <button className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-3xl shadow-xl text-xl font-semibold">

          Generate Clinical Reports

        </button>

        <button className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-3xl shadow-xl text-xl font-semibold">

          AI Learning Feedback

        </button>

      </div>

    </div>

  );

}