import React, {useState, useEffect} from 'react';
import axios from "axios";
import {FavoriteDogs} from '../../components';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './UserProfile.css';

export default function UserProfilePage() {
  const [showFavoriteDogs, setShowFavoriteDogs] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [token, userId]);

  return (
    <Tabs
    defaultActiveKey="profile"
    id="fill-tab-example"
    className="mb-3"
    fill
    >
      <Tab eventKey="home" title="Account Information">
        {userDetails.data ? (
          <>
            <p>First Name: {userDetails.data.first_name}</p>
            <p>Surname: {userDetails.data.last_name}</p>
            <p>Email: {userDetails.data.email}</p>
          </>
        ) : (
          <p>Loading user details...</p>
        )}  
      </Tab>
      <Tab eventKey="favorites" title="Favorites">
        <FavoriteDogs />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        Contact Us
      </Tab>
    </Tabs>
  )
}