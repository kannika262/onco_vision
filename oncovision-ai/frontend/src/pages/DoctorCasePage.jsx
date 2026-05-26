import React, { useEffect, useState } from "react";

export default function DoctorCasePage() {

  // =========================================
  // GET SELECTED CASE
  // =========================================

  const selectedCase = JSON.parse(
    localStorage.getItem("selectedCase")
  );

  const latestReport = JSON.parse(
    localStorage.getItem("latestReport")
  );

  // =========================================
  // STATES
  // =========================================

  const [doctorNotes, setDoctorNotes] = useState("");

  const [treatment, setTreatment] = useState("");

  const [caseStatus, setCaseStatus] = useState(
    selectedCase?.status || "Pending"
  );

  // =========================================
  // LOAD SAVED DATA
  // =========================================

  useEffect(() => {

    if (selectedCase?.id) {

      const savedNotes = localStorage.getItem(
        `doctorNotes_${selectedCase.id}`
      );

      const savedTreatment = localStorage.getItem(
        `treatment_${selectedCase.id}`
      );

      if (savedNotes) {

        setDoctorNotes(savedNotes);

      }

      if (savedTreatment) {

        setTreatment(savedTreatment);

      }

    }

  }, [selectedCase]);

  // =========================================
  // SAVE NOTES
  // =========================================

  const handleSaveNotes = () => {

    localStorage.setItem(

      `doctorNotes_${selectedCase.id}`,

      doctorNotes

    );

    alert(
      "Doctor Notes Saved Successfully"
    );

  };

  // =========================================
  // SAVE TREATMENT
  // =========================================

  const handleSaveTreatment = () => {

    localStorage.setItem(

      `treatment_${selectedCase.id}`,

      treatment

    );

    alert(
      "Treatment Plan Saved"
    );

  };

  // =========================================
  // APPROVE DIAGNOSIS
  // =========================================

  const approveDiagnosis = () => {

    const updatedCase = {

      ...selectedCase,

      status: "Approved",

      doctor_verified: true

    };

    localStorage.setItem(

      "selectedCase",

      JSON.stringify(updatedCase)

    );

    setCaseStatus("Approved");

    alert(
      "Diagnosis Approved Successfully"
    );

  };

  // =========================================
  // EMERGENCY ALERT
  // =========================================

  const triggerEmergency = () => {

    const updatedCase = {

      ...selectedCase,

      status: "Emergency"

    };

    localStorage.setItem(

      "selectedCase",

      JSON.stringify(updatedCase)

    );

    setCaseStatus("Emergency");

    alert(
      "Emergency Alert Activated"
    );

  };

  // =========================================
  // UI
  // =========================================

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-blue-700 mb-4">

            Doctor Case Review

          </h1>

          <p className="text-gray-500 text-lg">

            AI-assisted diagnosis verification system

          </p>

        </div>

        {/* ========================================= */}
        {/* STATUS BADGE */}
        {/* ========================================= */}

        <div className="mb-10">

          <span

            className={`px-6 py-3 rounded-full text-white text-lg font-semibold ${
              caseStatus === "Emergency"
                ? "bg-red-600"
                : caseStatus === "Approved"
                ? "bg-green-600"
                : "bg-yellow-500"
            }`}

          >

            {caseStatus}

          </span>

        </div>

        {/* ========================================= */}
        {/* SUMMARY */}
        {/* ========================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-blue-700 mb-4">

              Prediction

            </h2>

            <p className="text-xl text-gray-700">

              {selectedCase?.prediction}

            </p>

          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-green-700 mb-4">

              Confidence

            </h2>

            <p className="text-xl text-gray-700">

              {selectedCase?.confidence}

            </p>

          </div>

          <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-purple-700 mb-4">

              Scan Type

            </h2>

            <p className="text-xl text-gray-700">

              {selectedCase?.scanType}

            </p>

          </div>

          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-red-700 mb-4">

              Risk Level

            </h2>

            <p className="text-xl text-gray-700">

              {selectedCase?.risk}

            </p>

          </div>

        </div>

        {/* ========================================= */}
        {/* HEATMAP */}
        {/* ========================================= */}

        <div className="mb-12">

          <h2 className="text-4xl font-bold text-red-600 mb-8">

            AI Tumor Localization Heatmap

          </h2>

          {

            latestReport?.heatmap ? (

              <img

                src={`http://127.0.0.1:8000/${latestReport.heatmap}`}

                alt="heatmap"

                className="rounded-3xl shadow-xl border w-full"

              />

            ) : (

              <div className="bg-gray-200 h-[400px] rounded-3xl flex items-center justify-center">

                <p className="text-2xl text-gray-500">

                  Heatmap Not Available

                </p>

              </div>

            )

          }

        </div>

        {/* ========================================= */}
        {/* DOCTOR NOTES */}
        {/* ========================================= */}

        <div className="bg-gray-50 border rounded-3xl p-8 mb-10">

          <h2 className="text-3xl font-bold mb-8">

            Doctor Notes & Actions

          </h2>

          <textarea

            value={doctorNotes}

            onChange={(e) =>
              setDoctorNotes(e.target.value)
            }

            rows="8"

            placeholder="Add diagnosis notes, recommendations, prescriptions..."

            className="w-full border rounded-2xl p-5 outline-none mb-8 text-lg"

          />

          <div className="flex flex-wrap gap-4">

            <button

              onClick={handleSaveNotes}

              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

            >

              Save Notes

            </button>

            <button

              onClick={approveDiagnosis}

              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"

            >

              Approve Diagnosis

            </button>

            <button

              onClick={triggerEmergency}

              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"

            >

              Emergency Alert

            </button>

          </div>

        </div>

        {/* ========================================= */}
        {/* TREATMENT */}
        {/* ========================================= */}

        <div className="bg-white border rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">

            Treatment Prescription

          </h2>

          <textarea

            value={treatment}

            onChange={(e) =>
              setTreatment(e.target.value)
            }

            rows="6"

            placeholder="Prescribe medications, chemotherapy, radiation therapy, biopsy recommendations..."

            className="w-full border rounded-2xl p-5 outline-none mb-8 text-lg"

          />

          <button

            onClick={handleSaveTreatment}

            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl"

          >

            Save Treatment Plan

          </button>

        </div>

      </div>

    </div>

  );

}