import React, { useState } from "react";
import "./DonatePage.css";

const DonatePage = () => {
  const [donationType, setDonationType] = useState("single");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const handleDonationTypeChange = (type) => {
    setDonationType(type);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setSelectedAmount("");
    setCustomAmount(e.target.value);
  };

  const handleSubmit = () => {
    const finalAmount = customAmount || selectedAmount;
    if (finalAmount) {
      alert(`Thank you for your ${donationType} donation of £${finalAmount}!`);
      setDonationType("single");
      setSelectedAmount("");
      setCustomAmount("");
    } else {
      alert("Please select or enter a donation amount.");
    }
  };

  return (
    <div className="donate-page">
      <div className="donate-card">
        <h2 className="donate-title">Make a Donation</h2>
        <div className="donation-type">
          <button
            className={`donation-button ${
              donationType === "single" ? "active" : ""
            }`}
            onClick={() => handleDonationTypeChange("single")}
          >
            <img
              src="/images/card-icon.png"
              alt="Icon"
              className="button-icon"
            />
            <span>Single</span>
          </button>
          <button
            className={`donation-button ${
              donationType === "monthly" ? "active" : ""
            }`}
            onClick={() => handleDonationTypeChange("monthly")}
          >
            <img
              src="/images/calendar-icon-donatepage.png"
              alt="Icon"
              className="button-icon"
            />
            <span>Monthly</span>
          </button>
        </div>
        <div className="donation-amount">
          <h3>How much would you like to donate?</h3>
          <div className="amount-options">
            {[10, 20, 50].map((amount) => (
              <button
                key={amount}
                className={`amount-button ${
                  selectedAmount === amount ? "active" : ""
                }`}
                onClick={() => handleAmountSelect(amount)}
              >
                £{amount}
              </button>
            ))}
          </div>
          <div className="custom-amount">
            <input
              type="number"
              placeholder="Enter an amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
            />
          </div>
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DonatePage;
