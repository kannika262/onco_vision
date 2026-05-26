import React from "react";

import { useLocation } from "react-router-dom";

export default function CaseDetails() {

  // =========================================
  // GET CASE DATA FROM ROUTER
  // =========================================

  const location = useLocation();

  const caseData = location.state?.caseData;

  // =========================================
  // SAFETY CHECK
  // =========================================

  if (!caseData) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

          <h1 className="text-4xl font-bold text-red-600 mb-4">

            No Case Data Found

          </h1>

          <p className="text-gray-600 text-lg">

            Please open the case from Doctor Dashboard.

          </p>

        </div>

      </div>

    );

  }

  // =========================================
  // RISK COLOR
  // =========================================

  const getRiskColor = (risk) => {

    if (risk === "Critical")
      return "bg-red-100 text-red-700";

    if (risk === "High")
      return "bg-orange-100 text-orange-700";

    if (risk === "Moderate")
      return "bg-yellow-100 text-yellow-700";

    return "bg-green-100 text-green-700";

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-blue-700">

            Patient Case Details

          </h1>

          <p className="text-gray-600 mt-3 text-xl">

            AI-assisted clinical diagnosis review

          </p>

        </div>

        {/* ========================================= */}
        {/* PATIENT SUMMARY */}
        {/* ========================================= */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-gray-500 text-lg">

              Case ID

            </h2>

            <p className="text-2xl font-bold mt-4">

              {caseData.id}

            </p>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-gray-500 text-lg">

              Patient

            </h2>

            <p className="text-2xl font-bold mt-4">

              {caseData.patient}

            </p>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-gray-500 text-lg">

              Scan Type

            </h2>

            <p className="text-2xl font-bold mt-4">

              {caseData.scanType}

            </p>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-gray-500 text-lg">

              Risk Level

            </h2>

            <p className={`text-2xl font-bold mt-4 px-4 py-2 rounded-full inline-block ${getRiskColor(caseData.risk)}`}>

              {caseData.risk}

            </p>

          </div>

        </div>

        {/* ========================================= */}
        {/* AI REPORT */}
        {/* ========================================= */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

          <h2 className="text-3xl font-bold text-green-700 mb-8">

            AI Clinical Report

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Prediction */}

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold text-blue-700 mb-4">

                Prediction

              </h3>

              <p className="text-xl text-gray-700 font-semibold">

                {caseData.prediction}

              </p>

            </div>

            {/* Confidence */}

            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold text-green-700 mb-4">

                Confidence

              </h3>

              <p className="text-xl text-gray-700 font-semibold">

                {caseData.confidence}

              </p>

            </div>

          </div>

          {/* ========================================= */}
          {/* OBSERVATIONS */}
          {/* ========================================= */}

          <div className="mt-10">

            <h3 className="text-2xl font-bold mb-6">

              AI Observations

            </h3>

            <ul className="list-disc ml-8 space-y-3 text-lg text-gray-700">

              <li>
                AI detected abnormal tissue region.
              </li>

              <li>
                Heatmap localization generated successfully.
              </li>

              <li>
                Clinical review recommended for further diagnosis.
              </li>

              <li>
                Confidence score indicates high probability detection.
              </li>

            </ul>

          </div>

        </div>

        {/* ========================================= */}
        {/* HEATMAP */}
        {/* ========================================= */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

          <h2 className="text-3xl font-bold text-red-600 mb-8">

            Tumor Localization Heatmap

          </h2>

          {

            caseData.heatmap ? (

              <img

                src={`http://127.0.0.1:8000/${caseData.heatmap}`}

                alt="Heatmap"

                className="rounded-3xl shadow-xl border-4 border-red-200 w-full"

              />

            ) : (

              <div className="bg-gray-200 h-[400px] rounded-3xl flex items-center justify-center">

                <p className="text-2xl text-gray-500">

                  No Heatmap Available

                </p>

              </div>

            )

          }

        </div>

        {/* ========================================= */}
        {/* DOCTOR ACTIONS */}
        {/* ========================================= */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-8">

            Doctor Actions

          </h2>

          {/* Notes */}

          <textarea

            rows="6"

            placeholder="Add doctor notes..."

            className="w-full border border-gray-300 rounded-2xl p-5 mb-8 outline-none"

          />

          {/* Action Buttons */}

          <div className="flex flex-wrap gap-6">

            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-lg shadow-lg">

              Approve Diagnosis

            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg shadow-lg">

              Prescribe Treatment

            </button>

            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl text-lg shadow-lg">

              Request Specialist Opinion

            </button>

            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl text-lg shadow-lg">

              Reject Case

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}