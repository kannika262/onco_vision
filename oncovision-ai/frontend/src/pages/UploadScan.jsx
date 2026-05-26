import React, { useState } from "react";

import axios from "axios";

export default function UploadScan() {

  // =========================================
  // STATES
  // =========================================

  const [scanType, setScanType] = useState("brain");

  const [file, setFile] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  // =========================================
  // HANDLE UPLOAD
  // =========================================

  const handleUpload = async () => {

    if (!file) {

      alert("Please select a file");

      return;

    }

    try {

      setLoading(true);

      // =========================================
      // CREATE FORM DATA
      // =========================================

      const formData = new FormData();

      formData.append("file", file);

      // =========================================
      // UPLOAD IMAGE
      // =========================================

      const uploadResponse = await axios.post(

        "http://127.0.0.1:8000/upload/scan",

        formData

      );

      console.log(
        "UPLOAD RESPONSE:",
        uploadResponse.data
      );

      // =========================================
      // GET IMAGE PATH
      // =========================================

      const imagePath =
        uploadResponse.data.file_path;

      // =========================================
      // RUN AI PREDICTION
      // =========================================

      const predictionResponse = await axios.get(

        `http://127.0.0.1:8000/prediction/${scanType}?image_path=${imagePath}`

      );

      console.log(
        "PREDICTION RESPONSE:",
        predictionResponse.data
      );

      const predictionData =
        predictionResponse.data;

      // =========================================
      // GENERATE AI REPORT
      // =========================================

      const reportResponse = await axios.get(

        `http://127.0.0.1:8000/report/generate?prediction=${predictionData.prediction}&confidence=${predictionData.confidence}`

      );

      // =========================================
      // FINAL RESULT
      // =========================================

      const finalResult = {

        prediction:
          predictionData.prediction,

        confidence:
          predictionData.confidence,

        scan_type:
          predictionData.scan_type || scanType,

        heatmap:
          predictionData.heatmap,

        report:
          reportResponse.data

      };

      // =========================================
      // SAVE RESULT FOR PATIENT SIDE
      // =========================================

      setResult(finalResult);

      // =========================================
      // STORE CORRECT DATA
      // FOR DOCTOR DASHBOARD
      // =========================================

      localStorage.setItem(

        "latestReport",

        JSON.stringify(finalResult)

      );

      console.log(
        "SAVED REPORT:",
        finalResult
      );

      // =========================================
      // RISK CALCULATION
      // =========================================

      const confidenceValue = parseFloat(
        predictionData.confidence
      );

      let riskLevel = "Low";

      if (confidenceValue >= 90) {

        riskLevel = "Critical";

      }

      else if (confidenceValue >= 70) {

        riskLevel = "High";

      }

      else if (confidenceValue >= 40) {

        riskLevel = "Moderate";

      }

      // =========================================
      // CREATE CASE FOR DOCTOR DASHBOARD
      // =========================================

      await axios.post(

        "http://127.0.0.1:8000/doctor/add-case",

        {

          case_id:
            "CASE-" + Math.floor(Math.random() * 10000),

          patient:
            "Uploaded Patient",

          scanType:
            scanType === "brain"
            ? "Brain MRI"
            : "Lung X-Ray",

          prediction:
            finalResult.prediction,

          confidence:
            finalResult.confidence,

          heatmap:
            finalResult.heatmap,

          report:
            finalResult.report,

          risk:
            riskLevel,

          status:
            riskLevel === "Critical"
            ? "Emergency"
            : "Pending"

        }

      );

      setLoading(false);

    }

    catch (error) {

      console.log(error);

      setLoading(false);

      alert("Prediction Failed");

    }

  };

  // =========================================
  // UI
  // =========================================

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8">

      <div className="max-w-6xl mx-auto bg-white p-10 rounded-3xl shadow-2xl">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-blue-700 mb-4">

            OncoVision AI

          </h1>

          <p className="text-gray-600 text-xl">

            AI-Powered Multi-Cancer Detection Platform

          </p>

        </div>

        {/* ========================================= */}
        {/* SCAN TYPE */}
        {/* ========================================= */}

        <div className="mb-8">

          <label className="block text-2xl font-semibold mb-4 text-gray-800">

            Select Scan Type

          </label>

          <select

            value={scanType}

            onChange={(e) =>
              setScanType(e.target.value)
            }

            className="w-full p-4 rounded-2xl border border-gray-300 text-lg shadow-sm"

          >

            <option value="brain">

              Brain MRI Scan

            </option>

            <option value="lung">

              Lung X-Ray Scan

            </option>

          </select>

        </div>

        {/* ========================================= */}
        {/* UPLOAD SECTION */}
        {/* ========================================= */}

        <div className="border-2 border-dashed border-blue-300 rounded-3xl p-12 bg-blue-50 text-center">

          <input

            type="file"

            onChange={(e) =>
              setFile(e.target.files[0])
            }

            className="mb-6"

          />

          <p className="text-gray-600 text-lg mb-8">

            Supported Formats:
            JPG, PNG, JPEG, DICOM

          </p>

          <button

            onClick={handleUpload}

            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-12 py-4 rounded-2xl text-xl shadow-xl"

          >

            {
              loading
                ? "Analyzing Scan..."
                : "Upload & Analyze"
            }

          </button>

        </div>

        {/* ========================================= */}
        {/* RESULTS */}
        {/* ========================================= */}

        {
          result && (

            <div className="mt-12 bg-gray-50 p-10 rounded-3xl border shadow-lg">

              {/* ========================================= */}
              {/* TITLE */}
              {/* ========================================= */}

              <h2 className="text-4xl font-bold text-green-600 mb-8">

                AI Prediction Result

              </h2>

              {/* ========================================= */}
              {/* BASIC RESULT */}
              {/* ========================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                <div className="bg-white p-6 rounded-2xl shadow-md">

                  <p className="text-lg text-gray-500 mb-2">

                    Scan Type

                  </p>

                  <h3 className="text-2xl font-bold text-black">

                    {result.scan_type}

                  </h3>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">

                  <p className="text-lg text-gray-500 mb-2">

                    AI Prediction

                  </p>

                  <h3 className="text-2xl font-bold text-red-600">

                    {result.prediction}

                  </h3>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">

                  <p className="text-lg text-gray-500 mb-2">

                    Confidence Score

                  </p>

                  <h3 className="text-2xl font-bold text-blue-700">

                    {result.confidence}

                  </h3>

                </div>

              </div>

              {/* ========================================= */}
              {/* HEATMAP */}
              {/* ========================================= */}

              {
                result?.heatmap &&
                result?.scan_type === "brain" && (

                  <div className="mb-12">

                    <h3 className="text-3xl font-bold text-red-600 mb-6">

                      AI Tumor Localization Heatmap

                    </h3>

                    <img

                      src={`http://127.0.0.1:8000/${result.heatmap}?t=${Date.now()}`}

                      alt="GradCAM Heatmap"

                      className="w-[500px] rounded-3xl shadow-2xl border-4 border-red-200"

                    />

                  </div>

                )
              }

              {/* ========================================= */}
              {/* CLINICAL REPORT */}
              {/* ========================================= */}

              <div className="bg-white p-10 rounded-3xl shadow-xl border">

                <h3 className="text-3xl font-bold text-blue-700 mb-8">

                  Clinical AI Medical Report

                </h3>

                <div className="space-y-5 text-lg text-gray-800">

                  <p>

                    <strong>Hospital:</strong>{" "}

                    {result.report?.hospital_name}

                  </p>

                  <p>

                    <strong>Scan Type:</strong>{" "}

                    {result.report?.scan_type}

                  </p>

                  <p>

                    <strong>Patient Status:</strong>{" "}

                    {result.report?.patient_status}

                  </p>

                  <p>

                    <strong>Severity:</strong>{" "}

                    {result.report?.severity}

                  </p>

                  <p>

                    <strong>Emergency Level:</strong>{" "}

                    {result.report?.emergency_level}

                  </p>

                  <p>

                    <strong>Tumor Location:</strong>{" "}

                    {result.report?.tumor_location}

                  </p>

                  <p>

                    <strong>Clinical Impression:</strong>{" "}

                    {result.report?.clinical_impression}

                  </p>

                  <div>

                    <strong>AI Observations:</strong>

                    <ul className="list-disc ml-8 mt-3 space-y-2">

                      {
                        result.report?.ai_observations?.map(

                          (obs, index) => (

                            <li key={index}>

                              {obs}

                            </li>

                          )

                        )
                      }

                    </ul>

                  </div>

                  <p>

                    <strong>Recommendation:</strong>{" "}

                    {result.report?.recommendation}

                  </p>

                  <p>

                    <strong>Doctor Notes:</strong>{" "}

                    {result.report?.doctor_notes}

                  </p>

                  <p>

                    <strong>AI Model:</strong>{" "}

                    {result.report?.ai_model}

                  </p>

                </div>

              </div>

              {/* ========================================= */}
              {/* PDF BUTTON */}
              {/* ========================================= */}

              <div className="mt-10">

                <a

                  href={`http://127.0.0.1:8000/pdf/generate?prediction=${result.prediction}&confidence=${result.confidence}&scan_type=${result.scan_type}`}

                  target="_blank"

                  rel="noreferrer"

                >

                  <button className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white px-12 py-4 rounded-2xl text-xl shadow-xl">

                    Download Clinical PDF Report

                  </button>

                </a>

              </div>

            </div>

          )
        }

      </div>

    </div>

  );

}