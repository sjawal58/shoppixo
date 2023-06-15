/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, Col, Row, } from "reactstrap"
import { Form, } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../env';
import moment from 'moment';

const ProfileTab = () => {
    const navigate = useNavigate();

    const [userProfileData, setUserProfileData] = useState(null)
    const [gender, setGender] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState(null)

    useEffect(() => {
        getUserProfileData()
    }, [])

    const getUserProfileData = async () => {
        await axios({
            method: 'GET',
            url: URL + `/customer/${localStorage.getItem('user_id')}`,
        }).then((response) => {
            console.log("getUserProfileData", response)
            const data = response.data.data;
            setUserProfileData(data)
            if (data?.gender == 0) {
                setGender("Male")
            } else if (data?.gender == 1) {
                setGender("Female")
            }
            setDateOfBirth(moment(data?.date_of_birth).format('DD-MM-YYYY'))
        }).catch((error) => {

        })
    }

    return (
        <Row>
            <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" readOnly value={localStorage.getItem("username") || (userProfileData?.firstname + " " + userProfileData?.lastname)} />
                </Form.Group>
            </Col>
            <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Email" readOnly value={userProfileData?.email} />
                </Form.Group>
            </Col>
            <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Phone no." readOnly value={userProfileData?.phone_number} />
                </Form.Group>
            </Col>
            <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="text" placeholder="Date of birth" readOnly value={dateOfBirth} />
                </Form.Group>
            </Col>
            <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="text" placeholder="Gender" readOnly value={gender} />
                </Form.Group>
            </Col>
            <Col className='mb-3' xs="12" sm="12" md="12">
                <Button className='profile_edit_btn' onClick={() => navigate("/edit-profile")}>Edit Profile</Button>
            </Col>
        </Row>
    )
}

export default ProfileTab