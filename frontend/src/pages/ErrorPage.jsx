import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1 style={{ fontWeight: "bold", padding: "1rem" }}>
        Oops! Something went wrong!
      </h1>
      <p>
        We apologize for the inconvenience. It seems there's an issue with our
        transport service.
      </p>
      <p>Please try again later or contact our support team for assistance.</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/" style={{ marginRight: "20px" }}>
          Go to Homepage
        </Link>
        <Link to="/contactus">Contact Support</Link>
      </div>
    </div>
  );
}