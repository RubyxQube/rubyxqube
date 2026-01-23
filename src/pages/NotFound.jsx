import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="surface section">
      <h1 className="h1">Page not found</h1>
      <p className="p">That route doesn’t exist.</p>
      <Link className="btn primary" to="/">Back home</Link>
    </section>
  );
}
