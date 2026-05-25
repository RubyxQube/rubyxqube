import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Pricing from "./pages/Pricing.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import About from "./pages/About.jsx";
import Audit from "./pages/Audit.jsx";
import Report from "./pages/Report.jsx";
import Designs from "./pages/Designs.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/portfolio" element={<Portfolio />} />

        <Route path="/quote" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/designs" element={<Designs />} />
        <Route path="/report" element={<Report />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
