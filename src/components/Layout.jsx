import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MeshGradient } from "@paper-design/shaders-react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ChatWidget from "./ChatWidget.jsx";
import { siteConfig } from "../siteConfig.js";
import ScrollToTop from "./ScrollToTop.jsx";

const titles = (brand) => ({
  "/": brand,
  "/services": `Services • ${brand}`,
  "/pricing": `Pricing • ${brand}`,
  "/portfolio": `Portfolio • ${brand}`,
  "/about": `About • ${brand}`,
  "/quote": `Get a Quote • ${brand}`,
  "/contact": `Get a Quote • ${brand}`, // alias
  "/privacy": `Privacy • ${brand}`,
});

export default function Layout() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const map = titles(siteConfig.brand);
    document.title = map[pathname] || siteConfig.brand;
  }, [pathname]);

  return (
    <div className="appShell">
      {/* Animated full-site ambient background */}
      <MeshGradient
        colors={["#080808", "#0b0c14", "#0e1020", "#08080e"]}
        speed={0.20}
        backgroundColor="#080808"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
        }}
      />
      <ScrollToTop />
      <Navbar />
      <main className="mainGrow">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
