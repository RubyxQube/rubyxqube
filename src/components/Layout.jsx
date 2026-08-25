import React from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MeshGradient } from "@paper-design/shaders-react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ChatWidget from "./ChatWidget.jsx";
import { siteConfig } from "../siteConfig.js";
import ScrollToTop from "./ScrollToTop.jsx";
import { useTheme } from "../hooks/useTheme.js";

export default function Layout() {
  const { theme, toggle } = useTheme();

  // No document.title here on purpose.
  //
  // This used to set the title from a hardcoded path map, which fought the
  // per-page <Helmet><title> and lost or won at random. Whichever ran last
  // won, so the same page produced different titles on different loads.
  //
  // It was also incomplete, and silently so. Five routes were missing from
  // that map and fell through to the bare brand name, /blog/:slug among them,
  // which meant every individual blog post could render as just "RubyxQube".
  // A map keyed by exact pathname can never cover a parameterised route.
  //
  // All 28 pages set their own Helmet title, so this was redundant as well as
  // harmful. Helmet owns the title now. Verified across four consecutive loads
  // of the same route after removing it.

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
