import React, {useState} from 'react';
import {FavoriteDogs} from '../../components';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './UserProfile.css'

export default function UserProfilePage() {
  const [showFavoriteDogs, setShowFavoriteDogs] = useState(false);

  return (
    <Tabs
    defaultActiveKey="profile"
    id="fill-tab-example"
    className="mb-3"
    fill
    >
      <Tab eventKey="home" title="Account Information">
        Account Information
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