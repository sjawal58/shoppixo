/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Row, } from "reactstrap"
import { Form, } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../env';
import { useForm } from "react-hook-form";

const DeliveryTab = () => {
    const navigate = useNavigate();

    const [deliveryData, setDeliveryData] = useState(null)

    const {
        register,
        setValue,
    } = useForm({ shouldFocusError: true });

    useEffect(() => {
        getDeliveryData()
    }, [])

    const getDeliveryData = async () => {
        await axios({
            method: 'GET',
            url: URL + `/customer/${localStorage.getItem('user_id')}`,
        }).then((response) => {
            console.log("getUserProfileData", response)
            const data = response.data.data;
            setDeliveryData(data)
            setValue("delivery_label", data?.delivery_label)
        }).catch((error) => {

        })
    }

    return (
        <Row>
            <Col className='mb-3' xs="12" sm="12" md="12">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Please enter name" readOnly value={localStorage.getItem("username") || "user"} />
                </Form.Group>
            </Col>
            <Col className='mb-3' xs="12" sm="12" md="12">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Please enter address" readOnly value={deliveryData?.address} />
                </Form.Group>
            </Col>
            <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" placeholder="Please enter mobile" readOnly value={deliveryData?.phone_number} />
                </Form.Group>
            </Col>
            <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Province</Form.Label>
                    <Form.Control type="text" placeholder="Please enter province" readOnly value={deliveryData?.province} />
                </Form.Group>
            </Col>
            <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Please enter city" readOnly value={deliveryData?.city} />
                </Form.Group>
            </Col>
            <Col className='mb-3' xs="12" sm="6" md="5">
                <Form.Group className="mb-0" controlId="formBasicEmail">
                    <Form.Label>Label for effective Delivery</Form.Label>
                    <Form.Select
                        defaultValue={deliveryData?.delivery_label}
                        aria-label="Default select example"
                        {...register("delivery_label", {
                            required: false,
                        })}
                    >
                        <option value="" disabled selected>Choose label</option>
                        <option value="1" disabled>Home</option>
                        <option value="2" disabled>Office</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col className='' xs="12" sm="12" md="12">
                <Button className='profile_edit_btn' onClick={() => navigate("/edit-delivery")}>Edit Delivery Address</Button>
            </Col>
        </Row>
    )
}

export default DeliveryTab