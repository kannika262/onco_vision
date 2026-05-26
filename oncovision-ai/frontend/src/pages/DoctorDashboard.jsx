import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {

  const navigate = useNavigate();

  const [patientCases, setPatientCases] = useState([]);

  useEffect(() => {

    const latestReport = JSON.parse(
      localStorage.getItem("latestReport")
    );

    console.log("LATEST REPORT:", latestReport);

    if (latestReport) {

      const newCase = {

        id: "CASE-201",

        patient: "Uploaded Patient",

        scanType:
          latestReport.scan_type === "brain"
            ? "Brain MRI"
            : "Lung X-Ray",

        prediction:
          latestReport.prediction ||
          "No Prediction",

        confidence:
          latestReport.confidence ||
          "0%",

        risk:
          latestReport.prediction?.includes(
            "Detected"
          )
            ? "High"
            : "Low",

        status: "Pending",

        heatmap:
          latestReport.heatmap,

        fullReport:
          latestReport,

      };

      setPatientCases([newCase]);

    }

  }, []);

  const handleViewCase = (caseItem) => {

    localStorage.setItem(
      "selectedCase",
      JSON.stringify(caseItem)
    );

    navigate("/doctor-case");

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mb-10">

        <h1 className="text-6xl font-bold text-blue-700 mb-4">
          Doctor Dashboard
        </h1>

        <p className="text-gray-600 text-2xl">
          AI-Assisted Cancer Diagnosis Management System
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-gray-500 text-2xl mb-5">
            Total Cases
          </h2>

          <p className="text-6xl font-bold text-blue-600">
            {patientCases.length}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-gray-500 text-2xl mb-5">
            Pending Reviews
          </h2>

          <p className="text-6xl font-bold text-yellow-500">
            {patientCases.length}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-gray-500 text-2xl mb-5">
            Emergency Alerts
          </h2>

          <p className="text-6xl font-bold text-red-600">
            {
              patientCases.filter(
                (item) => item.risk === "High"
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-gray-500 text-2xl mb-5">
            Approved Cases
          </h2>

          <p className="text-6xl font-bold text-green-600">
            0
          </p>
        </div>

      </div>

      {/* Cases */}

      <div className="bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-5xl font-bold mb-10">
          Patient Cases
        </h2>

        {/* Header */}

        <div className="grid grid-cols-8 gap-4 bg-gray-100 rounded-2xl p-5 font-bold text-xl mb-6">

          <div>Case ID</div>

          <div>Patient</div>

          <div>Scan Type</div>

          <div>Prediction</div>

          <div>Confidence</div>

          <div>Risk</div>

          <div>Status</div>

          <div>Details</div>

        </div>

        {/* Dynamic Data */}

        {
          patientCases.map((caseItem, index) => (

            <div
              key={index}
              className="grid grid-cols-8 gap-4 bg-gray-50 rounded-2xl p-5 items-center text-lg mb-5"
            >

              <div className="font-semibold">
                {caseItem.id}
              </div>

              <div>
                {caseItem.patient}
              </div>

              <div>
                {caseItem.scanType}
              </div>

              <div className="text-red-600 font-semibold">
                {caseItem.prediction}
              </div>

              <div>
                {caseItem.confidence}
              </div>

              <div>

                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    caseItem.risk === "High"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {caseItem.risk}
                </span>

              </div>

              <div>

                <span className="px-4 py-2 rounded-full bg-yellow-500 text-white">
                  {caseItem.status}
                </span>

              </div>

              <div>

                <button

                  onClick={() =>
                    handleViewCase(caseItem)
                  }

                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"

                >
                  View
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

}