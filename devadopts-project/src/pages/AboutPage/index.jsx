import React from "react";
import "./Aboutpage.css";

export default function About() {
  return (
    <div className="mainbody">
      <div className="about-section">
        <div className="about-header">
          <h2>About Us</h2>
        </div>
        <div className="mission-section">
          <h1>Our Mission</h1>
          <p>
            Our mission is to enhance dog adoption by connecting centers with
            the right owners, ensuring each dog finds a perfect match. We focus
            on understanding the needs of both dogs and adopters to create
            lasting, happy relationships.
          </p>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <img
            src="/images/Streamline adoption.png"
            alt="man filling out form for dog"
          />
          <h3>Streamline Adoption</h3>
          <p>
            Here is some text which will be used to describe in short detail
            what our product or service is about.
          </p>
        </div>

        <div className="card">
          <img
            src="/images/Make informed decisions.png"
            alt="calculator with dog"
          />
          <h3>Make Informed Decisions</h3>
          <p>
            Here is some text which will be used to describe in short detail
            what our product or service is about.
          </p>
        </div>
      </div>
    </div>
  );
}
