import React, { useState, useEffect } from "react";
import { FavoriteDogs } from "../../components";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, { useState, useEffect } from "react";
import { FavoriteDogs } from "../../components";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { jwtDecode } from "jwt-decode";
import "./UserProfile.css";
import axios from "axios";

export default function UserProfilePage() {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  const token = localStorage.getItem("token");
  const obj = jwtDecode(token);
  const user_id = obj.user_id;
  console.log("obj", obj);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          `${process.env.REACT_URL}/users/${user_id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getUser();
  }, [token, user_id]);
  console.log(userDetails);
  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab
        eventKey="profile"
        title="Account Information"
        className="account-info-tab"
      >
        {loading ? (
          <div className="loading-message">
            <p>Loading user details...</p>
          </div>
        ) : userDetails && userDetails.data ? (
          <div className="user-details">
            <p className="user-info">
              <span className="user-label">First Name:</span>{" "}
              {userDetails.data.first_name}
            </p>
            <p className="user-info">
              <span className="user-label">Surname:</span>{" "}
              {userDetails.data.last_name}
            </p>
            <p className="user-info">
              <span className="user-label">Email:</span>{" "}
              {userDetails.data.email}
            </p>
          </div>
        ) : (
          <div className="error-message">
            <p>User details not found.</p>
          </div>
        )}
      </Tab>

      {/* <Tab eventKey="profile" title="Account Information">
        {loading ? ( // Show loading state
          <p>Loading user details...</p>
        ) : userDetails && userDetails.data ? ( // Render user details if available
          <>
            <p>First Name: {userDetails.data.first_name}</p>
            <p>Surname: {userDetails.data.last_name}</p>
            <p>Email: {userDetails.data.email}</p>
          </>
        ) : (
          <p>User details not found.</p> // Show error if userDetails is null or undefined
        )}
      </Tab> */}
      <Tab eventKey="favorites" title="Favorites">
        <FavoriteDogs />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        <div className="contact-page">
          <div className="contact-header">
            <h1 className="contact-header-title">Contact Us</h1>
            <p className="contact-header-subtitle">
              Hey! If you have any queries about the dogs, please make sure to
              reach out to us!
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="phone"
                  name="phone"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="form-textarea"
                  id="message"
                  name="message"
                ></textarea>
              </div>

              <button className="form-button" type="submit">
                Submit
              </button>
            </div>

            <div className="contact-info">
              <div className="info-block">
                <h4 className="info-title">Address</h4>
                <p className="info-text">
                  15 Paw Lane, Beagleborough, Barkshire, WD4 6DL, United Kingdom
                </p>
              </div>

              <div className="info-block">
                <h4 className="info-title">Contact Number</h4>
                <p className="info-text">020 7946 0123</p>
              </div>

              <div className="info-block">
                <h4 className="info-title">Email Address</h4>
                <p className="info-text">contact@devadopts.co.uk</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="contactheader">
          <p className="contactheader1">Contact Us</p>
          <p className="contactheader2">
            Hey! If you have any queries about the dogs, please make sure to
            reach out to us!
          </p>
        </div>
        <div className="contactcontainer">
          <div className="Cformcontainer">
            <p className="Cformtext">Name</p>
            <input className="textbox1" type="text" name="name"></input>
            <p className="Cformtext">Email</p>
            <input className="textbox1" type="text" name="email"></input>
            <p className="Cformtext">Phone Number</p>
            <input className="textbox1" type="text" name="phone number"></input>
            <p className="Cformtext">Message</p>
            <textarea
              className="textbox2"
              type="text"
              name="message"
            ></textarea>
            <button className="Cformbutton" type="submit">
              Submit
            </button>
          </div>
          <div className="Ctextcontainer">
            <h4>Address</h4>
            <p>
              Address: 15 Paw Lane, Beagleborough, Barkshire, WD4 6DL, United
              Kingdom
            </p>
            <h4>Contact Number</h4>
            <p>Telephone Number: 020 7946 0123</p>
            <h4>Email Address</h4>
            <p>Email: contact@devadopts.co.uk</p>
          </div>
        </div> */}
      </Tab>
    </Tabs>
  );
}
