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

      <section className="section background-image-section">
  <div className="cardlanding">
    <h1 className="highlight-orange">Bring Them Home</h1>
    <p>
      Our mission at DevAdopts is simple, <span className="highlight-red">bridge the gap</span> between potential pet owners and rescue centres by leveraging <span className="highlight-red">AI technology</span>. This platform helps users communicate their preferences and needs, matching them with dogs that are the <span className="highlight-red">best fit</span> for their lifestyle. These loving dogs deserve a chance at a forever home, so let’s <span className="highlight-red">“Bring Them Home.”</span>
    </p>
  </div>
</section>



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