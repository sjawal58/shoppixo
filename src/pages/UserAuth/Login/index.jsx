/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "./Login.css"
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
import axios from 'axios';
import { URL } from "../../../env"
import { useDispatch } from "react-redux"
import { AddDeliveryAddressAction } from "../../../redux/delivery_address/DeliveryAddressAction"

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passwordShow, setPasswordShow] = useState(false);
    const [loginBtnLoading, setLoginBtnLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
        reset,
    } = useForm({ shouldFocusError: true });

    const onSubmit = (data) => {
        console.log("login-onSubmit", data);

        setLoginBtnLoading(true)

        axios({
            method: "POST",
            url: URL + "/login",
            data: { email: data.email, password: data.password },
        }).then((response) => {
            console.log("login-response", response)

            axios.get(URL + "/validuser", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": response?.data?.data?.token
                }
            }).then((resp) => {
                console.log("login-validate-response", resp)
                setLoginBtnLoading(false)
                dispatch(AddDeliveryAddressAction(resp?.data?.data));
                localStorage.setItem("token123", response?.data?.data?.token);
                localStorage.setItem("user_id", response?.data?.data?.userValid?._id);
                localStorage.setItem("username", response?.data?.data?.userValid?.firstname + " " + response?.data?.data?.userValid?.lastname);

                // Token Expiry Time Set
                const minutesToAdd = 60;
                const currentDate = new Date();
                const expiryDate = new Date(
                    currentDate.getTime() + minutesToAdd * 60000
                );
                localStorage.setItem("token_expiry_time", expiryDate);

                navigate("/profile");
            }).catch((err) => {
                console.log("login-validate-response-error", err)

                toast.error(err.response?.data?.message, {
                    position: "top-right"
                });
                setLoginBtnLoading(false)
            })
            setLoginBtnLoading(false)
        }).catch((error) => {
            console.log("login-response-error", error)

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
    }

    return (
        <div className="app_container">
            <div className="user_auth__wrapped login_wrapper">
                <Row className='justify-content-center'>
                    <Col sm="10" md="7" lg="6">
                        <Card className="p-3">
                            <h4 className="text-center">{"User Login"}</h4>
                            <Form
                                className="needs-validation"
                                noValidate=""
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="mt-4 mb-4">
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

                                        <div style={{ textAlign: "end", marginTop: 5 }}>
                                            <Link
                                                to=""
                                                className="auth_forgot_btn"
                                            >
                                                {"Forgot Password?"}
                                            </Link>
                                        </div>
                                    </div>
                                </FormControl>
                                <Button
                                    id="login_submit_btn"
                                    type="submit"
                                    className="user_submit_btn"
                                    disabled={loginBtnLoading}
                                    style={{ fontSize: 22, position: 'relative' }}
                                >
                                    {
                                        loginBtnLoading && (<Spinner style={{ height: 18, width: 18, marginRight: 6, color: 'white', }} />)
                                    }
                                    <span style={{ color: 'white' }}>Login</span>
                                </Button>
                            </Form>
                            <div className="user_switch_account">
                                <p>{"Don't have an Account?"}</p>
                                <Button
                                    onClick={() => {
                                        navigate("/register");
                                    }}
                                >
                                    {"Register"}
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Login