import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <section className="surface section">
      <Helmet>
        <title>Page Not Found — RubyxQube</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 className="h1">Page not found</h1>
      <p className="p">That route doesn’t exist.</p>
      <Link className="btn primary" to="/">Back home</Link>
    </section>
  );
}
