/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import "./Auth.css";
import Breadcrumb from 'components/Common/Breadcrumb'
import { Container, Card, CardBody, Row, Col, Form, Input, Button, Label } from "reactstrap"
import ButtonSpinner2 from "../../components/Common/ButtonSpinner2"
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import logoSm from "../../assets/images/logo-sm.png";
import axios from 'axios';
import { URL } from 'env';
import { toast } from 'react-toastify';

const RegisterSeller = () => {

    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimPassword, setShowConfrimPassword] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ shouldFocusError: true });

    const onSubmit = async (data) => {
        console.log("onSubmit-Seller", data)

        if (data.password == data.confirm_password) {
            setBtnLoading(true);

            const formData = {
                firstname: data.firstName,
                lastname: data.lastName,
                email: data.email,
                password: data.password,
                role: "seller",
            }

            await axios({
                method: "POST",
                url: `${URL}/admin-register`,
                headers: {
                    // "Authorization": localStorage.getItem("usersdatatoken"),
                    "Content-Type": "application/json",
                },
                data: formData,
            }).then((response) => {
                console.log("seller-response", response)

                // localStorage.setItem("usersdatatoken", response.data?.data.token);

                toast.success("Seller Created Successfully !!", {
                    position: "top-right"
                })

                history.push("/login");

                setBtnLoading(false);
            }).catch((error) => {
                console.log("seller-response-error", error)

                if (error.response?.data?.message) {
                    toast.error(error.response?.data?.message, {
                        position: "top-right"
                    })
                } else {
                    toast.error("Failed to Create Seller", {
                        position: "top-right"
                    })
                }

                setBtnLoading(false);
            }).finally(() => {
                setBtnLoading(false);
            })

        } else {
            setError("confirm_password", {
                message: "Password does not match",
            }, { shouldFocus: true });
        }
    }

    return (
        <Fragment>
            {/* <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="fas fa-home h2" />
                </Link>
            </div> */}
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={4}>
                            <Card className="overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                                <div className="bg-primary">
                                    <div className="text-primary text-center p-4">
                                        <h5 className="text-white font-size-20">
                                            Create New Seller
                                        </h5>
                                        <p className="text-white-50">
                                            Sign up to sell your Products.
                                        </p>
                                        <Link to="#" className="logo logo-admin">
                                            <img src={logoSm} height="24" alt="logo" />
                                        </Link>
                                    </div>
                                </div>
                                <CardBody className="p-4 mt-3">
                                    <div className="p-3">
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Row>
                                                <Col className="mb-3" md={12}>
                                                    <Label for="firstName">First Name</Label>
                                                    <Controller
                                                        control={control}
                                                        name='firstName'
                                                        rules={{
                                                            required: true,
                                                            maxLength: 30,
                                                            minLength: 3,
                                                            pattern: /^[a-zA-Z0-9.\s]+$/,
                                                        }}
                                                        render={({ field }) => (
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                placeholder={"Enter First Name"}
                                                            />
                                                        )}
                                                    />
                                                    <span className="field_error">
                                                        {errors.firstName?.type == "required" &&
                                                            "First Name is required"}
                                                        {errors.firstName?.type == "maxLength" && "Maximum Length: " + "30"}
                                                        {errors.firstName?.type == "minLength" && "Minumum Length: " + "3"}
                                                        {errors.firstName?.type == "pattern" &&
                                                            "Please write alphanumeric values"}
                                                    </span>
                                                </Col>
                                                <Col className="mb-3" md={12}>
                                                    <Label for="lastName">Last Name</Label>
                                                    <Controller
                                                        control={control}
                                                        name='lastName'
                                                        rules={{
                                                            required: true,
                                                            maxLength: 30,
                                                            minLength: 3,
                                                            pattern: /^[a-zA-Z0-9.\s]+$/,
                                                        }}
                                                        render={({ field }) => (
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                placeholder={"Enter Last Name"}
                                                            />
                                                        )}
                                                    />
                                                    <span className="field_error">
                                                        {errors.lastName?.type == "required" &&
                                                            "Last Name is required"}
                                                        {errors.lastName?.type == "maxLength" && "Maximum Length: " + "30"}
                                                        {errors.lastName?.type == "minLength" && "Minumum Length: " + "3"}
                                                        {errors.lastName?.type == "pattern" &&
                                                            "Please write alphanumeric values"}
                                                    </span>
                                                </Col>
                                                <Col className="mb-3" md={12}>
                                                    <Label for="email">Email</Label>
                                                    <Controller
                                                        control={control}
                                                        name='email'
                                                        rules={{
                                                            required: true,
                                                            minLength: 8,
                                                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        }}
                                                        render={({ field }) => (
                                                            <Input
                                                                {...field}
                                                                type="email"
                                                                placeholder={"Enter Email"}
                                                            />
                                                        )}
                                                    />
                                                    <span className="field_error">
                                                        {errors.email?.type == "required" && "Email is required"}
                                                        {errors.email?.type == "minLength" && "Minimum Length Reuired: 8"}
                                                        {errors.email?.type == "pattern" && "Please enter valid email address"}
                                                        {errors.email?.message}
                                                    </span>
                                                </Col>
                                                <Col className="mb-3" md={12}>
                                                    <Label for="password">Password</Label>
                                                    <Controller
                                                        control={control}
                                                        name='password'
                                                        rules={{ required: true, minLength: 6, }}
                                                        render={({ field }) => (
                                                            <div className='password_field_wrap'>
                                                                <Input
                                                                    {...field}
                                                                    type={showPassword ? "text" : "password"}
                                                                    placeholder={"Enter Password"}
                                                                />
                                                                <span
                                                                    className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                    <span className="field_error">
                                                        {errors.password?.type == "required" && "Password is required"}
                                                        {errors.password?.type == "minLength" && "Minimum Length Reuired: 6"}
                                                        {errors.password?.message}
                                                    </span>
                                                </Col>
                                                <Col className="mb-3" md={12}>
                                                    <Label for="confirm_password">Confirm Password</Label>
                                                    <Controller
                                                        control={control}
                                                        name='confirm_password'
                                                        rules={{ required: true, }}
                                                        render={({ field }) => (
                                                            <div className='password_field_wrap'>
                                                                <Input
                                                                    {...field}
                                                                    type={showConfrimPassword ? "text" : "password"}
                                                                    placeholder={"Enter Confirm Password"}
                                                                />
                                                                <span
                                                                    className={showConfrimPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}
                                                                    onClick={() => setShowConfrimPassword(!showConfrimPassword)}
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                    <span className="field_error">
                                                        {errors.confirm_password?.type == "required" && "Confirm Password is required"}
                                                        {errors.confirm_password?.message || ""}
                                                    </span>
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col sm={6}>
                                                </Col>
                                                <Col sm={6} className="text-end">
                                                    <ButtonSpinner2
                                                        type="submit"
                                                        variant={"btn-primary"}
                                                        text={"Create Seller"}
                                                        loading={btnLoading}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                        {/* <Row className="mt-2 mb-0 row">
                                            <div className="col-12 mt-4">
                                                <Link to="/forgot-password">
                                                    <i className="mdi mdi-lock"></i> 
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                        </Row> */}
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    Already&#39;t have an account ?{" "}
                                    <Link
                                        to="/login"
                                        className="fw-medium text-primary"
                                    >
                                        {" "}
                                        Sign-in now{" "}
                                    </Link>{" "}
                                </p>
                                <p>
                                    Copyright © {new Date().getFullYear()} Shoppixo Shoppping. {" "}
                                    <i className="mdi mdi-heart text-danger" /> All Copyrights Reserved.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}

export default RegisterSeller