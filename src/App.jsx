import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Mission = lazy(() => import("./pages/Mission"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#F0FDF4]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/about" element={<About />} />

          {/* Legacy & moved URLs redirected to canonical destinations */}
          <Route path="/download" element={<Navigate to="/" replace />} />
          <Route path="/quran" element={<Navigate to="/#quran" replace />} />
          <Route path="/tafsir" element={<Navigate to="/#quran" replace />} />
          <Route path="/prayer-tracker" element={<Navigate to="/#qaza" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
