import React from "react";
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate('/Home');
  };

  const handleDogbotButtonClick = () => {
    navigate('/DogsDisplay');
  };

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
        <img src="./images/Decor1.png" className="decor-image" alt="Decorative Element 1" />
        <img src="./images/Decor2.png" className="decor-image-bottom-left" alt="Decorative Element 2" />
        <div className="content-container">
          <div className="image-container">
            <img src="./images/Dog1.png" className="dog1" alt="Dog 1" />
            <img src="./images/Dog2.png" className="dog2" alt="Dog 2" />
            <img src="./images/Dog3.png" className="dog3" alt="Dog 3" />
            <img src="./images/Dog4.png" className="dog4" alt="Dog 4" />
          </div>
          <div className="text-container">
            <p>
              <span className="highlight-orange">Where Paws Meet Their Perfect</span>{" "}
              <span className="highlight-red">Match!</span>
            </p>
          </div>
        </div>
      </section>

      {/* Third Section: Split Color with Rounded Corners */}
      <section className="section split-section">
  <img src="./images/DogSide.png" className="dogside-image" alt="Dog Side" />
  <div className="left-half">
  <h2 className="title">
    Find Your <span className="highlight-black">Perfect</span> Match!
  </h2>
  <img src="./images/Logo.png" className="logo-image" alt="Logo" />
  <img src="./images/PawPrints.png" className="pawprints-image" alt="Paw Prints" />
  <button className="talk-to-dogbot-button" onClick={handleDogbotButtonClick}>
    Talk to <span className="highlight-red">Dogbot</span> Now
  </button>
</div>
  <div className="right-half">
    <img src="./images/Map2.png" className="map-image" alt="Map" />
    <button className="custom-button" onClick={handleHomeButtonClick}>
      <span className="highlight-orange">Don't Want To Be </span>
      <span className="highlight-red">Matched?</span>
      <br />
      <span className="highlight-orange">Start </span>
      <span className="highlight-red">Searching</span>
      <span className="highlight-orange"> Yourself!</span>
    </button>
  </div>
</section>
    </div>
  );
};

export default LandingPage;