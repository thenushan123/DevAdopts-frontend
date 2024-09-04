import React, {useState, useEffect} from 'react';
import { FavoriteDogs } from '../../components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { jwtDecode } from "jwt-decode";
import './UserProfile.css'
import axios from 'axios';

export default function UserProfilePage() {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  const token = localStorage.getItem("token");
  const obj = jwtDecode(token);
  const user_id = obj.user_id
  console.log("obj", obj)

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);  // Start loading
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
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);  // Stop loading
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