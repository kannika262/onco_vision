import React, { useState } from "react";

export default function DoctorCasePage() {

  const report = JSON.parse(
    localStorage.getItem("latestReport")
  );

  const [doctorNotes, setDoctorNotes] = useState(
    localStorage.getItem("doctorNotes") || ""
  );

  const handleSaveNotes = () => {

    localStorage.setItem(
      "doctorNotes",
      doctorNotes
    );

    alert("Doctor Notes Saved Successfully");

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-blue-700 mb-4">
            Doctor Case Review
          </h1>

          <p className="text-gray-500 text-lg">
            AI-assisted diagnosis verification system
          </p>

        </div>

        {/* Report Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Prediction
            </h2>

            <p className="text-xl text-gray-700">
              {report?.prediction}
            </p>

          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Confidence
            </h2>

            <p className="text-xl text-gray-700">
              {report?.confidence}
            </p>

          </div>

          <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Scan Type
            </h2>

            <p className="text-xl text-gray-700">
              {report?.scan_type}
            </p>

          </div>

          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-red-700 mb-4">
              Severity
            </h2>

            <p className="text-xl text-gray-700">
              {report?.report?.severity || "High"}
            </p>

          </div>

        </div>

        {/* Heatmap */}
        <div className="mb-10">

          <h2 className="text-3xl font-bold text-red-600 mb-6">
            AI Heatmap Analysis
          </h2>

          {
            report?.heatmap ? (

              <img
                src={`http://127.0.0.1:8000/${report.heatmap}`}
                alt="heatmap"
                className="rounded-3xl shadow-xl border w-full"
              />

            ) : (

              <div className="bg-gray-200 h-[350px] rounded-3xl flex items-center justify-center border">

                <p className="text-gray-500 text-2xl">
                  Heatmap Not Available
                </p>

              </div>

            )
          }

        </div>

        {/* Doctor Notes */}
        <div className="bg-white border rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Doctor Notes & Actions
          </h2>

          <textarea

            value={doctorNotes}

            onChange={(e) =>
              setDoctorNotes(e.target.value)
            }

            placeholder="Add doctor notes..."

            rows="8"

            className="w-full border rounded-2xl p-4 outline-none mb-6"

          />

          <div className="flex flex-wrap gap-4">

            <button
              onClick={handleSaveNotes}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Save Notes
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl">
              Approve Diagnosis
            </button>

            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl">
              Prescribe Treatment
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}