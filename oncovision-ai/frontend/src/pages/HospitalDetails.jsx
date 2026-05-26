import React from "react";

export default function HospitalDetails() {

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-5xl font-bold text-blue-700 mb-10">
          Federated Hospital Network
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Apollo */}
          <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-blue-700 mb-4">
              Apollo Hospital
            </h2>

            <p className="text-lg text-gray-700">
              Local AI Brain MRI Training Active
            </p>

            <div className="mt-6">

              <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full">
                Connected
              </span>

            </div>

          </div>

          {/* AIIMS */}
          <div className="bg-green-50 border border-green-200 rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-4">
              AIIMS Delhi
            </h2>

            <p className="text-lg text-gray-700">
              Federated Model Synchronization Running
            </p>

            <div className="mt-6">

              <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full">
                Synced
              </span>

            </div>

          </div>

          {/* Manipal */}
          <div className="bg-purple-50 border border-purple-200 rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-purple-700 mb-4">
              Manipal Hospital
            </h2>

            <p className="text-lg text-gray-700">
              Secure Aggregation Enabled
            </p>

            <div className="mt-6">

              <span className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full">
                Training
              </span>

            </div>

          </div>

          {/* Fortis */}
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-red-700 mb-4">
              Fortis Healthcare
            </h2>

            <p className="text-lg text-gray-700">
              Privacy-Preserving AI Collaboration Active
            </p>

            <div className="mt-6">

              <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full">
                Active
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}