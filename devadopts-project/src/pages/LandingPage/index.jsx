// import React from 'react';


// export default function LandingPage() {
//   return (
//     <>
//       <h1>Where Paws Meet Their Perfect Match!</h1>
//     </>
//   )
// }


import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* First Section: Background Image with Card */}
      <section className="section background-image-section">
        <div className="card">
          <h1>Welcome to Our Site</h1>
          <p>Your journey starts here.</p>
        </div>
      </section>

      {/* Second Section: White Page */}
      <section className="section white-section">
        <h2>About Us</h2>
        <p>
          We provide exceptional services to our clients. Our team is dedicated
          to ensuring your satisfaction.
        </p>
      </section>

      {/* Third Section: Split Color with Rounded Corners */}
      <section className="section split-section">
        <div className="left-half">
          <h2>Our Mission</h2>
        </div>
        <div className="right-half">
          <h2>Contact Us</h2>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
