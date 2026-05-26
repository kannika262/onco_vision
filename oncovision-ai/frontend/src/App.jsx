import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorCasePage from "./pages/DoctorCasePage";

import UploadScan from "./pages/UploadScan";
import ReportPage from "./pages/ReportPage";

import AdminDashboard from "./pages/AdminDashboard";

function App() {

  return (

    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >

      <Routes>

        {/* ========================================= */}
        {/* LOGIN */}
        {/* ========================================= */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* ========================================= */}
        {/* REGISTER */}
        {/* ========================================= */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ========================================= */}
        {/* PATIENT DASHBOARD */}
        {/* ========================================= */}

        <Route
          path="/patient"
          element={<PatientDashboard />}
        />

        {/* ========================================= */}
        {/* DOCTOR DASHBOARD */}
        {/* ========================================= */}

        <Route
          path="/doctor"
          element={<DoctorDashboard />}
        />

        {/* ========================================= */}
        {/* DOCTOR CASE PAGE */}
        {/* ========================================= */}

        <Route
          path="/doctor-case"
          element={<DoctorCasePage />}
        />

        {/* ========================================= */}
        {/* CASE DETAILS */}
        {/* ========================================= */}

        <Route
          path="/case-details"
          element={<DoctorCasePage />}
        />

        {/* ========================================= */}
        {/* UPLOAD */}
        {/* ========================================= */}

        <Route
          path="/upload"
          element={<UploadScan />}
        />

        {/* ========================================= */}
        {/* REPORT */}
        {/* ========================================= */}

        <Route
          path="/report"
          element={<ReportPage />}
        />

        {/* ========================================= */}
        {/* ADMIN */}
        {/* ========================================= */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;