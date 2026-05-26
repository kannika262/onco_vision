import React from "react";

import {
  useNavigate
} from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  // =====================================
  // HOSPITAL LIST
  // =====================================

  const hospitals = [

    "Apollo Hospital",

    "AIIMS Delhi",

    "Manipal Hospital",

    "Fortis Healthcare"

  ];

  // =====================================
  // NAVIGATION FUNCTION
  // =====================================

  const handleViewHospital = (hospital) => {

    navigate(
      `/hospital-details/${encodeURIComponent(
        hospital
      )}`
    );

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="
            text-6xl
            font-bold
            text-blue-700
            mb-4
          ">
            Admin Dashboard
          </h1>

          <p className="
            text-gray-600
            text-xl
          ">
            Federated AI Healthcare Management System
          </p>

        </div>

        {/* OVERVIEW CARDS */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-6
          mb-12
        ">

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
          ">

            <h2 className="
              text-gray-500
              text-lg
            ">
              Connected Hospitals
            </h2>

            <p className="
              text-5xl
              font-bold
              text-blue-700
              mt-4
            ">
              4
            </p>

          </div>

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
          ">

            <h2 className="
              text-gray-500
              text-lg
            ">
              Active AI Models
            </h2>

            <p className="
              text-5xl
              font-bold
              text-green-700
              mt-4
            ">
              12
            </p>

          </div>

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
          ">

            <h2 className="
              text-gray-500
              text-lg
            ">
              Patients Processed
            </h2>

            <p className="
              text-5xl
              font-bold
              text-purple-700
              mt-4
            ">
              5.9K
            </p>

          </div>

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
          ">

            <h2 className="
              text-gray-500
              text-lg
            ">
              Federated Accuracy
            </h2>

            <p className="
              text-5xl
              font-bold
              text-red-700
              mt-4
            ">
              96%
            </p>

          </div>

        </div>

        {/* HOSPITAL NETWORK */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          p-10
          mb-12
        ">

          <h2 className="
            text-5xl
            font-bold
            mb-10
          ">
            Hospital Network
          </h2>

          <div className="space-y-6">

            {hospitals.map((hospital, index) => (

              <div

                key={index}

                className="
                  flex
                  justify-between
                  items-center
                  border
                  rounded-3xl
                  p-6
                  hover:shadow-lg
                  transition
                  bg-gray-50
                "
              >

                <div>

                  <h3 className="
                    text-3xl
                    font-bold
                    mb-2
                  ">
                    {hospital}
                  </h3>

                  <p className="
                    text-gray-500
                    text-lg
                  ">
                    Federated AI Node Connected
                  </p>

                </div>

                <button

                  onClick={() =>
                    handleViewHospital(hospital)
                  }

                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-8
                    py-3
                    rounded-2xl
                    text-lg
                    font-semibold
                    transition
                  "
                >
                  View
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* PLATFORM ANALYTICS */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          p-10
        ">

          <h2 className="
            text-5xl
            font-bold
            mb-10
          ">
            Platform Analytics
          </h2>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-8
          ">

            <div className="
              bg-blue-50
              border
              border-blue-200
              rounded-3xl
              p-8
            ">

              <h3 className="
                text-2xl
                font-bold
                text-blue-700
                mb-4
              ">
                Brain MRI Model
              </h3>

              <p className="
                text-6xl
                font-bold
                text-blue-800
              ">
                96%
              </p>

              <p className="
                text-gray-600
                mt-4
              ">
                Federated Accuracy
              </p>

            </div>

            <div className="
              bg-green-50
              border
              border-green-200
              rounded-3xl
              p-8
            ">

              <h3 className="
                text-2xl
                font-bold
                text-green-700
                mb-4
              ">
                Lung AI Model
              </h3>

              <p className="
                text-6xl
                font-bold
                text-green-800
              ">
                94%
              </p>

              <p className="
                text-gray-600
                mt-4
              ">
                Federated Accuracy
              </p>

            </div>

            <div className="
              bg-purple-50
              border
              border-purple-200
              rounded-3xl
              p-8
            ">

              <h3 className="
                text-2xl
                font-bold
                text-purple-700
                mb-4
              ">
                Secure Aggregation
              </h3>

              <p className="
                text-6xl
                font-bold
                text-purple-800
              ">
                ON
              </p>

              <p className="
                text-gray-600
                mt-4
              ">
                Privacy-Preserving AI
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}