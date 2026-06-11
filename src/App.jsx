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
import HowItWorks from "./pages/HowItWorks.jsx";
import Sign from "./pages/Sign.jsx";
import NotFound from "./pages/NotFound.jsx";

// Feature pages
import AiReceptionist from "./pages/AiReceptionist.jsx";
import PhoenixStoneworks from "./pages/PhoenixStoneworks.jsx";

// Blog
import BlogList from "./pages/BlogList.jsx";
import BlogPost from "./pages/BlogPost.jsx";

// City landing pages
import Meridian from "./pages/Meridian.jsx";
import Nampa from "./pages/Nampa.jsx";
import Caldwell from "./pages/Caldwell.jsx";
import Eagle from "./pages/Eagle.jsx";

// Industry landing pages
import HvacWebDesign from "./pages/HvacWebDesign.jsx";
import LandscapingWebDesign from "./pages/LandscapingWebDesign.jsx";
import PlumbingWebDesign from "./pages/PlumbingWebDesign.jsx";
import DentalWebDesign from "./pages/DentalWebDesign.jsx";

export default function App() {
  return (
    <Routes>
      {/* Contract signing — standalone page, no navbar/footer */}
      <Route path="/sign/:token" element={<Sign />} />

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
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/report" element={<Report />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Feature pages */}
        <Route path="/ai-receptionist" element={<AiReceptionist />} />
        <Route path="/work/phoenix-stoneworks" element={<PhoenixStoneworks />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* City landing pages */}
        <Route path="/web-design-meridian" element={<Meridian />} />
        <Route path="/web-design-nampa" element={<Nampa />} />
        <Route path="/web-design-caldwell" element={<Caldwell />} />
        <Route path="/web-design-eagle" element={<Eagle />} />

        {/* Industry landing pages */}
        <Route path="/web-design-hvac" element={<HvacWebDesign />} />
        <Route path="/web-design-landscaping" element={<LandscapingWebDesign />} />
        <Route path="/web-design-plumbing" element={<PlumbingWebDesign />} />
        <Route path="/web-design-dental" element={<DentalWebDesign />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
