/* eslint-disable no-unused-vars */
import React, { useState, } from 'react'
import "./Profile.css"
import { Button, Card, CardBody, Col, Row, } from "reactstrap"
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { Form, } from "react-bootstrap";
import axios from 'axios';
import { URL } from "../../../env"
import { useNavigate } from 'react-router-dom';
import ProfileTab from './ProfileTab';
import DeliveryTab from './DeliveryTab';

const Profile = () => {
  const navigate = useNavigate();

  // Pehli tab jo set ho ge wo yahan pr set ho  ge.
  const [settingsTabValue, setSettingsTabValue] = useState('1');
  // Ye tabs ka onchange click listener ha.
  const handleSettingsTabChange = (event, newValue) => {
    setSettingsTabValue(newValue);
  };

  console.log('Profile Page')

  return (
    <div className="profile_page_wrapper">
      <div className='profile_page_box'>
        <TabContext value={settingsTabValue}>
          <div className="profile_page_left_cont">
            <Card className="profile_page__Card">
              <Tabs
                className={`profile_page__Tabs`}
                value={settingsTabValue}
                onChange={handleSettingsTabChange}
                orientation="vertical"
                variant="scrollable"
                // scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
              >
                {/* Ye Tabs hain */}
                <Tab className={`profile_page__Tab`} label="Profile" iconPosition="start" value="1" />
                <Tab className={`profile_page__Tab`} label="Delivery Address" iconPosition="start" value="2" />
              </Tabs>
            </Card>
          </div>
          <div className="profile_page_details_cont">
            <Card className="profile_page_details_cont_card">
              {/* Ye tabs ka view ha, jis number ke tab select ho gee, us ka view yahan pr show ho ga */}
              <TabPanel value={"1"}>
                <h4 className='mb-3'>My Profile</h4>
                {/* <h5 style={{ marginBottom: 8 }}>Welcome {localStorage.getItem("username") || "user"}</h5> */}
                <div className="profile_page_details_data">
                  <ProfileTab />
                </div>
              </TabPanel>
              {/* Ye Delivery Address ke tab ha */}
              <TabPanel value={"2"}>
                <h4 className='mb-3'>Delivery Address</h4>
                <div className="profile_page_details_data">
                  <DeliveryTab />
                </div>
              </TabPanel>
            </Card>
          </div>
        </TabContext>
      </div>
    </div>
  )
}

export default Profile