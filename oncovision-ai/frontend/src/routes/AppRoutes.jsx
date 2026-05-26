import React from "react";

import {

  BrowserRouter,

  Routes,

  Route

} from "react-router-dom";


// =========================================
// PAGES
// =========================================

import UploadScan from "../pages/UploadScan";

import DoctorDashboard from "../pages/DoctorDashboard";

import CaseDetails from "../pages/CaseDetails";

import Login from "../pages/Login";


// =========================================
// APP ROUTES
// =========================================

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ========================================= */}
        {/* LOGIN */}
        {/* ========================================= */}

        <Route

          path="/"

          element={<Login />}

        />

        {/* ========================================= */}
        {/* UPLOAD SCAN */}
        {/* ========================================= */}

        <Route

          path="/upload"

          element={<UploadScan />}

        />

        {/* ========================================= */}
        {/* DOCTOR DASHBOARD */}
        {/* ========================================= */}

        <Route

          path="/doctor"

          element={<DoctorDashboard />}

        />

        {/* ========================================= */}
        {/* CASE DETAILS */}
        {/* ========================================= */}

       <Route
  path="/case-details"
  element={<CaseDetails />}
/>

      </Routes>

    </BrowserRouter>

  );

}