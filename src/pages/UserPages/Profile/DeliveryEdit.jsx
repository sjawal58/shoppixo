/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { Button, Card, CardBody, Col, Row, Spinner, } from "reactstrap"
import { useForm } from "react-hook-form";
import { Form, } from "react-bootstrap";
import axios from 'axios';
import { URL } from "../../../env"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { AddDeliveryAddressAction } from "../../../redux/delivery_address/DeliveryAddressAction"

const DeliveryEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
        reset,
    } = useForm({ shouldFocusError: true });

    const [deliveryData, setDeliveryData] = useState(null)
    const [loginBtnLoading, setLoginBtnLoading] = useState(false);

    useEffect(() => {
        getDeliveryData()
    }, [])

    const getDeliveryData = async () => {
        await axios({
            method: 'GET',
            url: URL + `/customer/${localStorage.getItem('user_id')}`,
        }).then((response) => {
            console.log("getUserProfileData", response)
            dispatch(AddDeliveryAddressAction(response?.data?.data));

            const data = response.data.data;
            setDeliveryData(data)

            setValue('address', data?.address)
            setValue('phone_number', data?.phone_number)
            setValue('province', data?.province)
            setValue('city', data?.city)
            setValue('delivery_label', data?.delivery_label)

        }).catch((error) => {

        })
    }

    const onSubmit = async (data) => {
        console.log("edit-delivery-onSubmit", data);

        const user_id = localStorage.getItem('user_id');

        if (user_id) {
            setLoginBtnLoading(true)

            const formData = {
                customer_id: user_id,
                address: data?.address,
                province: data?.province,
                phone_number: data?.phone_number,
                city: data?.city,
                delivery_label: data?.delivery_label,
            }

            await axios({
                method: "PUT",
                url: URL + `/customer/delivery/update/${user_id}`,
                data: formData,
            }).then((response) => {
                console.log("edit-delivery-response", response)
                setLoginBtnLoading(false)

                if (response?.data?.status == true) {

                    toast.success('Delivery Address Updated', {
                        position: "top-right"
                    });

                    navigate('/profile');
                } else {
                    toast.error(response?.data?.message, {
                        position: "top-right"
                    });
                }

            }).catch((error) => {
                console.log("edit-delivery-response-error", error)

                if (error.response?.data?.message) {
                    toast.error(error.response.data.message, {
                        position: "top-right"
                    });
                } else if (error?.message) {
                    toast.error(error?.message, {
                        position: "top-right"
                    });
                } else {
                    toast.error("Failed", {
                        position: "top-right"
                    });
                }
                setLoginBtnLoading(false)
            })
        } else {
            toast.error("User Id not Found", {
                position: "top-right"
            });
        }
    }

    return (
        <div className="profile_edit_page_wrapper">
            <Card>
                <Col className='mx-2 mb-0'>
                    <span className='fa fa-left-arrow' style={{
                        fontSize: 12, color: 'var(--color-primary)',
                        cursor: 'pointer'
                    }} onClick={() => navigate('/profile')}>Back</span>
                </Col>
                <CardBody>
                    <h4 className='mb-3'>Edit Delivery Address</h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
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
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        placeholder="Please enter delivery address"
                                        defaultValue={deliveryData?.address}
                                        {...register("address", {
                                            required: true,
                                        })}
                                    />
                                    <span className="error" style={{ fontSize: 12 }}>
                                        {errors.address?.type == "required" &&
                                            "Address is required"}
                                    </span>
                                </Form.Group>
                            </Col>
                            <Col className='mb-3' xs="12" sm="6" md="4">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone_number"
                                        placeholder="Please enter mobile no."
                                        defaultValue={deliveryData?.phone_number}
                                        {...register("phone_number", {
                                            required: true,
                                            minLength: 11,
                                            pattern: /^[0-9-+]+$/,
                                        })}
                                    />
                                    <span className="error">
                                        {errors.phone_number?.type == "required" && "Phone Number is required"}
                                        {errors.phone_number?.type == "minLength" && "Minimum Length is 11"}
                                        {errors.phone_number?.type == "pattern" &&
                                            "Please enter valid phone number"}
                                    </span>
                                </Form.Group>
                            </Col>
                            <Col className='mb-3' xs="12" sm="6" md="4">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="province"
                                        placeholder="Please enter province"
                                        defaultValue={deliveryData?.province}
                                        {...register("province", {
                                            required: true,
                                            pattern: /^[a-zA-Z0-9.\s]+$/,
                                        })}
                                    />
                                    <span className="error" style={{ fontSize: 12 }}>
                                        {errors.province?.type == "required" &&
                                            "Province is required"}
                                        {errors.province?.type == "pattern" &&
                                            "Please write alphanumeric values"}
                                    </span>
                                </Form.Group>
                            </Col>
                            <Col className='mb-3' xs="12" sm="6" md="4">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        placeholder="Please enter city"
                                        defaultValue={deliveryData?.province}
                                        {...register("city", {
                                            required: true,
                                            pattern: /^[a-zA-Z0-9.\s]+$/,
                                        })}
                                    />
                                    <span className="error" style={{ fontSize: 12 }}>
                                        {errors.city?.type == "required" &&
                                            "City is required"}
                                        {errors.city?.type == "pattern" &&
                                            "Please write alphanumeric values"}
                                    </span>
                                </Form.Group>
                            </Col>
                            <Col className='mb-3' xs="12" sm="6" md="5">
                                <Form.Group className="mb-0" controlId="formBasicEmail">
                                    <Form.Label>Label for effective Delivery</Form.Label>
                                    <Form.Select
                                        name="delivery_label"
                                        defaultValue={deliveryData?.delivery_label}
                                        aria-label="Default select example"
                                        {...register("delivery_label", {
                                            required: true,
                                        })}
                                    >
                                        <option value="" disabled selected>Choose label</option>
                                        <option value="1">Home</option>
                                        <option value="2">Office</option>
                                    </Form.Select>
                                    <span className="error" style={{ fontSize: 12 }}>
                                        {errors.delivery_label?.type == "required" &&
                                            "Delivery Label is required"}
                                    </span>
                                </Form.Group>
                            </Col>
                            <Col className='' xs="12" sm="12" md="12">
                                <Button className='profile_edit_btn' type='submit'>
                                    {
                                        loginBtnLoading && (<Spinner style={{ width: 18, height: 18, marginRight: 5, }} />)
                                    }
                                    <span>Save Delivery Address</span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default DeliveryEdit