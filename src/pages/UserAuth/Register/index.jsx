/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "./Register.css"
import "../UserAuth.css"
import { Card, Col, Row, Button, Form, Spinner, } from 'reactstrap'
import {
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PasswordShow from '../PasswordShow';
import { toast } from "react-toastify";
import countries from "../../../assets/countries";
import axios from 'axios';
import { URL } from "../../../env"

const Register = () => {

    const navigate = useNavigate();
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const [registerBtnLoading, setRegisterBtnLoading] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        reset,
        formState: { errors },
    } = useForm({ shouldFocusError: true });

    const onSubmit = (data) => {
        console.log("login-onSubmit", data);

        if (data.password == data.confirm_password) {
            setRegisterBtnLoading(true);

            axios({
                method: "POST",
                url: URL + "//customer-register",
                data: {
                    firstname: data.firstName,
                    lastname: data.lastName,
                    email: data.email,
                    password: data.password
                },
            }).then((response) => {
                console.log("register-response", response);
                setRegisterBtnLoading(false)

                toast.success(data.email + " Registered Successfully!!", {
                    position: toast.POSITION.TOP_RIGHT,
                })

                navigate("/login")

            }).catch((error) => {
                console.log("register-response-error", error);

                if (error.response?.data?.message) {
                    toast.error(error.response?.data?.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                } else {
                    toast.error("Failed to Register", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
                setRegisterBtnLoading(false)
            })


        } else {
            setError("confirm_password", { message: "Password don't matched" })
        }
    }

    return (
        <div className="app_container">
            <div className="user_auth__wrapped login_wrapper">
                <Row className='justify-content-center'>
                    <Col sm="10" md="7" lg="6">
                        <Card className="p-3">
                            <h4 className="text-center mb-4">{"Create Account"}</h4>
                            <Form
                                className="needs-validation"
                                noValidate=""
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="row m-0">
                                    <div className="col-md-6 ps-0 pe-0 pe-md-1">
                                        <div className="mb-3" controlId="reg_fname">
                                            <TextField
                                                InputLabelProps={{
                                                    required: true,
                                                }}
                                                label={"First Name"}
                                                variant="outlined"
                                                fullWidth
                                                size="normal"
                                                type="text"
                                                name="firstName"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        document
                                                            .getElementById("register_submit_btn")
                                                            .click();
                                                    }
                                                }}
                                                {...register("firstName", {
                                                    required: true,
                                                    pattern: /^[a-zA-Z0-9.\s]+$/,
                                                })}
                                            />
                                            <span className="error" style={{ fontSize: 12 }}>
                                                {errors.firstName?.type == "required" &&
                                                    "First Name is required"}
                                                {errors.firstName?.type == "pattern" &&
                                                    "Please write alphanumeric values"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ps-0 ps-md-1 pe-0">
                                        <div className="mb-3" controlId="reg_lname">
                                            <TextField
                                                InputLabelProps={{
                                                    required: true,
                                                }}
                                                label={"Last Name"}
                                                variant="outlined"
                                                fullWidth
                                                size="normal"
                                                type="text"
                                                name="lastName"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        document
                                                            .getElementById("register_submit_btn")
                                                            .click();
                                                    }
                                                }}
                                                {...register("lastName", {
                                                    required: true,
                                                    pattern: /^[a-zA-Z0-9.\s]+$/,
                                                })}
                                            />
                                            <span
                                                className="error text-capitalize"
                                                style={{ fontSize: 12 }}
                                            >
                                                {errors.lastName?.type == "required" &&
                                                    "Last Name is required."}
                                                {errors.lastName?.type == "maxLength" &&
                                                    "Maximum Length: " + "20"}
                                                {errors.lastName?.type == "pattern" &&
                                                    "Please write alphanumeric values"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 mb-4">
                                    <TextField
                                        InputLabelProps={{
                                            required: true,
                                        }}
                                        label={"Email"}
                                        variant="outlined"
                                        fullWidth
                                        size="normal"
                                        type="email"
                                        name="email"
                                        // onChange={controlLoginForm}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                // console.log('onKeyDown', e.target.value);
                                                document.getElementById("login_submit_btn").click();
                                            }
                                        }}
                                        {...register("email", {
                                            required: true,
                                            pattern: {
                                                value:
                                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Please enter a valid email",
                                            },
                                        })}
                                    />
                                    <span className="error">
                                        {errors.email?.type == "required" && "Email is required"}
                                        {errors.email?.type == "pattern" &&
                                            "Please enter valid email"}
                                    </span>
                                </div>
                                <FormControl fullWidth>
                                    <div className="mb-3">
                                        <InputLabel>{"Password"}</InputLabel>
                                        <OutlinedInput
                                            InputLabelProps={{
                                                required: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                            size="normal"
                                            type={passwordShow ? "text" : "password"}
                                            name="password"
                                            label={"Password"}
                                            // onChange={controlLoginForm}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    // console.log('onKeyDown', e.target.value);
                                                    document.getElementById("login_submit_btn").click();
                                                }
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <PasswordShow
                                                        passShow={passwordShow}
                                                        onclick={() => setPasswordShow(!passwordShow)}
                                                    />
                                                </InputAdornment>
                                            }
                                            {...register("password", {
                                                required: true,
                                                maxLength: 30,
                                                minLength: 6,
                                                pattern: /^[a-zA-Z0-9.\s]+$/,
                                            })}
                                        />
                                        <span className='error'>
                                            {errors.password?.type == "required" && "Password is required."}
                                            {errors.password?.type == "maxLength" &&
                                                "Maximum Length: " + "30"}
                                            {errors.password?.type == "minLength" &&
                                                "Minimum Length: " + "6"}
                                        </span>
                                    </div>
                                </FormControl>
                                <FormControl fullWidth>
                                    <div className="mb-3">
                                        <InputLabel>{"Confirm Password"}</InputLabel>
                                        <OutlinedInput
                                            InputLabelProps={{
                                                required: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                            size="normal"
                                            type={passwordShow ? "text" : "password"}
                                            name="confirm_password"
                                            label={"Confirm Password"}
                                            // onChange={controlLoginForm}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    // console.log('onKeyDown', e.target.value);
                                                    document.getElementById("login_submit_btn").click();
                                                }
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <PasswordShow
                                                        passShow={confirmPasswordShow}
                                                        onclick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                                                    />
                                                </InputAdornment>
                                            }
                                            {...register("confirm_password", { required: true, })}
                                        />
                                        <span className='error'>
                                            {errors.confirm_password?.type == "required" && "Confirm Password is required."}
                                            {errors.confirm_password?.message || ""}
                                        </span>
                                    </div>
                                </FormControl>
                                <Button
                                    id="register_submit_btn"
                                    type="submit"
                                    className="user_submit_btn mt-2"
                                    disabled={registerBtnLoading}
                                    style={{ fontSize: 22, position: 'relative' }}
                                >
                                    {
                                        registerBtnLoading && (<Spinner style={{ height: 18, width: 18, marginRight: 6, color: 'white', }} />)
                                    }
                                    <span style={{ color: 'white' }}>Register</span>
                                </Button>
                            </Form>
                            <div className="user_switch_account">
                                <p>{"Already have an Account?"}</p>
                                <Button
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    {"Login"}
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Register