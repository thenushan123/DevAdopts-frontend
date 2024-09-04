import React, {useState, useEffect} from 'react';
import {FavoriteDogs} from '../../components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './UserProfile.css'
import axios from 'axios';

export default function UserProfilePage() {
  const [showFavoriteDogs, setShowFavoriteDogs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("userId");
  console.log(userId);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);  // Start loading
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
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);  // Stop loading
      }
    };
    getUser();
  }, [token, userId]);
console.log(userDetails);
  return (
    <Tabs
    defaultActiveKey="profile"
    id="fill-tab-example"
    className="mb-3"
    fill
    >
      <Tab eventKey="profile" title="Account Information">
        {loading ? (  // Show loading state
          <p>Loading user details...</p>
        ) : userDetails && userDetails.data ? (  // Render user details if available
          <>
            <p>First Name: {userDetails.data.first_name}</p>
            <p>Surname: {userDetails.data.last_name}</p>
            <p>Email: {userDetails.data.email}</p>
          </>
        ) : (
          <p>User details not found.</p>  // Show error if userDetails is null or undefined
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