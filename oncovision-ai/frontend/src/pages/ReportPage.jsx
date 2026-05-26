import React from "react";

export default function ReportPage() {

  const report = JSON.parse(
    localStorage.getItem("latestReport")
  );

  if (!report) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white p-10 rounded-3xl shadow-xl">

          <h1 className="text-3xl font-bold text-red-600">
            No Report Available
          </h1>

        </div>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-blue-700 mb-4">
            AI Medical Report
          </h1>

          <p className="text-gray-500 text-lg">
            AI-powered cancer analysis and diagnostic summary
          </p>

        </div>

        {/* Report Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Prediction
            </h2>

            <p className="text-xl text-gray-700">
              {report.prediction}
            </p>

          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Confidence
            </h2>

            <p className="text-xl text-gray-700">
              {report.confidence}
            </p>

          </div>

          <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Scan Type
            </h2>

            <p className="text-xl text-gray-700">
              {report.scan_type}
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

        {/* AI Recommendation */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-8 mb-10">

          <h2 className="text-3xl font-bold text-yellow-700 mb-6">
            AI Recommendation
          </h2>

          <p className="text-lg text-gray-700 leading-8">

            {
              report?.report?.recommendation ||
              "Further specialist consultation recommended."
            }

          </p>

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
                className="rounded-3xl shadow-xl w-full"
              />

            ) : (

              <div className="bg-gray-200 h-[350px] rounded-3xl flex items-center justify-center">

                <p className="text-gray-500 text-2xl">
                  Heatmap Not Available
                </p>

              </div>

            )
          }

        </div>

        {/* Doctor Notes */}
        <div className="bg-white border rounded-3xl p-8 shadow-sm">

          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Doctor Notes
          </h2>

          <p className="text-lg text-gray-700 leading-8">

            {
              localStorage.getItem("doctorNotes") ||
              "No doctor notes available yet."
            }

          </p>

        </div>

      </div>

    </div>

  );
}