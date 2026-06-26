import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MeshGradient } from "@paper-design/shaders-react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ChatWidget from "./ChatWidget.jsx";
import { siteConfig } from "../siteConfig.js";
import ScrollToTop from "./ScrollToTop.jsx";
import { useTheme } from "../hooks/useTheme.js";

const titles = (brand) => ({
  "/": brand,
  "/services": `Services • ${brand}`,
  "/pricing": `Pricing • ${brand}`,
  "/portfolio": `Portfolio • ${brand}`,
  "/about": `About • ${brand}`,
  "/quote": `Get a Quote • ${brand}`,
  "/contact": `Get a Quote • ${brand}`,
  "/audit": `Free Website Audit • ${brand}`,
  "/designs": `Design Styles • ${brand}`,
  "/report": `Sample Monthly Report • ${brand}`,
  "/privacy": `Privacy • ${brand}`,
  "/terms": `Terms of Service • ${brand}`,
  "/ai-receptionist": `AI Receptionist • ${brand}`,
  "/work/phoenix-stoneworks": `Phoenix Stoneworks Case Study • ${brand}`,
  "/blog": `Blog • ${brand}`,
  "/web-design-meridian": `Web Design Meridian, ID • ${brand}`,
  "/web-design-nampa": `Web Design Nampa, ID • ${brand}`,
  "/web-design-caldwell": `Web Design Caldwell, ID • ${brand}`,
  "/web-design-eagle": `Web Design Eagle, ID • ${brand}`,
  "/web-design-hvac": `HVAC Web Design • ${brand}`,
  "/web-design-landscaping": `Landscaping Web Design • ${brand}`,
  "/web-design-plumbing": `Plumbing Web Design • ${brand}`,
  "/web-design-dental": `Dental Web Design • ${brand}`,
});

export default function Layout() {
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  React.useEffect(() => {
    const map = titles(siteConfig.brand);
    document.title = map[pathname] || siteConfig.brand;
  }, [pathname]);

  return (
    <div className="appShell">
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${siteConfig.siteUrl}/og-default.png`} />
      </Helmet>
      {/* Animated ambient background — adapts colors per theme */}
      <MeshGradient
        colors={
          theme === "dark"
            ? ["#060606", "#1e0610", "#06020e", "#180409"]
            : ["#F5F0EA", "#F0DDE4", "#EAD9CC", "#F5EDE8"]
        }
        speed={0.28}
        backgroundColor={theme === "dark" ? "#060606" : "#F5F0EA"}
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
      <Navbar theme={theme} onToggle={toggle} />
      <main className="mainGrow">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
