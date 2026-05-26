import React from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

export default function HospitalDetails() {

  const { hospitalName } = useParams();

  const navigate = useNavigate();

  const decodedName =
    decodeURIComponent(hospitalName);

  // =====================================
  // HOSPITAL DETAILS
  // =====================================

  let hospital = {};

  if (decodedName === "Apollo Hospital") {

    hospital = {

      status: "Connected",

      model: "Brain MRI AI",

      accuracy: "96%",

      patients: 1240,

      description:
        "Local AI Brain MRI Training Active"

    };

  }

  else if (decodedName === "AIIMS Delhi") {

    hospital = {

      status: "Synced",

      model: "Lung X-Ray AI",

      accuracy: "94%",

      patients: 2100,

      description:
        "Federated Model Synchronization Running"

    };

  }

  else if (decodedName === "Manipal Hospital") {

    hospital = {

      status: "Training",

      model: "Federated AI Node",

      accuracy: "91%",

      patients: 980,

      description:
        "Secure Aggregation Enabled"

    };

  }

  else if (decodedName === "Fortis Healthcare") {

    hospital = {

      status: "Active",

      model: "Cancer Detection AI",

      accuracy: "95%",

      patients: 1670,

      description:
        "Privacy-Preserving AI Collaboration Active"

    };

  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="
        max-w-7xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-xl
        p-10
      ">

        {/* HEADER */}

        <div className="
          flex
          justify-between
          items-center
          mb-10
        ">

          <div>

            <h1 className="
              text-5xl
              font-bold
              text-blue-700
              mb-3
            ">
              {decodedName}
            </h1>

            <p className="
              text-gray-500
              text-lg
            ">
              Federated AI Hospital Node
            </p>

          </div>

          <button

            onClick={() =>
              navigate("/admin")
            }

            className="
              bg-black
              hover:bg-gray-800
              text-white
              px-6
              py-3
              rounded-2xl
            "
          >
            Back
          </button>

        </div>

        {/* STATISTICS */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-6
          mb-10
        ">

          <div className="
            bg-blue-50
            border
            rounded-3xl
            p-6
          ">

            <h2 className="
              text-gray-500
              text-lg
            ">
              Status
            </h2>

            <p className="
              text-3xl
              font-bold
              text-blue-700
              mt-4
            ">
              {hospital.status}
            </p>

          </div>

          <div className="
            bg-green-50
            border
            rounded-3xl
            p-6
          ">

            <h2 className="
              text-gray-500
              text-lg
            ">
              AI Model
            </h2>

            <p className="
              text-2xl
              font-bold
              text-green-700
              mt-4
            ">
              {hospital.model}
            </p>

          </div>

          <div className="
            bg-purple-50
            border
            rounded-3xl
            p-6
          ">

            <h2 className="
              text-gray-500
              text-lg
            ">
              Accuracy
            </h2>

            <p className="
              text-4xl
              font-bold
              text-purple-700
              mt-4
            ">
              {hospital.accuracy}
            </p>

          </div>

          <div className="
            bg-red-50
            border
            rounded-3xl
            p-6
          ">

            <h2 className="
              text-gray-500
              text-lg
            ">
              Patients
            </h2>

            <p className="
              text-4xl
              font-bold
              text-red-700
              mt-4
            ">
              {hospital.patients}
            </p>

          </div>

        </div>

        {/* FEDERATED LEARNING */}

        <div className="
          bg-gray-50
          border
          rounded-3xl
          p-8
        ">

          <h2 className="
            text-3xl
            font-bold
            mb-8
          ">
            Federated Learning Status
          </h2>

          <div className="space-y-5">

            <div className="
              bg-white
              border
              rounded-2xl
              p-5
            ">
              {hospital.description}
            </div>

            <div className="
              bg-white
              border
              rounded-2xl
              p-5
            ">
              Patient medical data remains securely
              inside hospital servers.
            </div>

            <div className="
              bg-white
              border
              rounded-2xl
              p-5
            ">
              Only encrypted AI model weights are
              shared across the federated network.
            </div>

            <div className="
              bg-white
              border
              rounded-2xl
              p-5
            ">
              Global AI synchronization and secure
              aggregation currently active.
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}