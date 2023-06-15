/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import "./Auth.css";
import Breadcrumb from 'components/Common/Breadcrumb'
import { Container, Card, CardBody, Row, Col, Form, Input, Button, Label, Spinner } from "reactstrap"
import ButtonSpinner2 from "../../components/Common/ButtonSpinner2"
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import logoSm from "../../assets/images/logo-sm.png";
import axios from 'axios';
import { URL } from 'env';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { isTokenAvailable } from 'redux/auth/tokens/token/action';

const Login = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    dispatch(isTokenAvailable());
    const isTokenAvailableState = useSelector((state) => state.tokenAvailable);

    const [showPassword, setShowPassword] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ shouldFocusError: true });

    if (isTokenAvailableState) {
        if (window.location.pathname == "/login") {
            history.push("/dashboard")
        }
    }

    const onSubmit = (data) => {
        console.log("onSubmit-Login", data)
        setBtnLoading(true);

        axios({
            method: "POST",
            url: `${URL}/login-dashboard`,
            headers: {
                "Authorization": localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",
            },
            params: {
                email: data.email,
                password: data.password,
                remember_me: false,
            }
        }).then((response) => {
            console.log("login-response", response)

            localStorage.setItem("usersdatatoken", response.data?.data?.token);
            localStorage.setItem("usersdata", JSON.stringify(response.data?.data?.userValid));
            localStorage.setItem("user_id", response.data?.data?.userValid?._id);

            // Token Expiry Time Set
            const minutesToAdd = 60;
            const currentDate = new Date();
            const expiryDate = new Date(
                currentDate.getTime() + minutesToAdd * 60000
            );
            localStorage.setItem("token_expiry_time", expiryDate);

            // DashboardValid();

            setBtnLoading(false);

            history.push("/dashboard")

        }).catch((error) => {
            console.log("login-response-error", error)
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message, {
                    position: "top-right"
                })
            } else {
                toast.error("Failed to login", {
                    position: "top-right"
                })
            }
            setBtnLoading(false);
        }).finally(() => {
            setBtnLoading(false);
        })

    }

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch(`${URL}/validuser-dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        // const res = await axios.get(`${URL}`)

        const data = await res.json();
        console.log("user-data-response", data);

        if (data.status == 401 || !data) {
            console.log("user not valid");
            setBtnLoading(false);
        } else {
            console.log("user verify:", data);
            localStorage.setItem("usersdata", JSON.stringify(data.data));
            localStorage.setItem("user_id", data.data?._id);

            setBtnLoading(false);
            history.push("/dashboard")
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
                                            Welcome Back !
                                        </h5>
                                        <p className="text-white-50">
                                            Sign in to continue to Shoppixo Dashboard.
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
                                                                placeholder={"Enter email"}
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
                                            </Row>
                                            <Row className="mb-3">
                                                <Col sm={6}>
                                                    {/* <div className="form-check">
                                                        <Controller
                                                            control={control}
                                                            name='remember_me'
                                                            rules={{ required: false, }}
                                                            defaultValue={false}
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customControlInline"
                                                                />
                                                            )}
                                                        />
                                                        <label className="form-check-label" htmlFor="customControlInline">Remember me</label>
                                                    </div> */}
                                                </Col>
                                                <Col sm={6} className="text-end">
                                                    <ButtonSpinner2
                                                        type="submit"
                                                        variant={"btn-primary"}
                                                        text={"Log In"}
                                                        loading={btnLoading}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                        <Row className="mt-2 mb-0 row">
                                            {/* <div className="col-12 mt-4">
                                                <Link to="/forgot-password">
                                                    <i className="mdi mdi-lock"></i> 
                                                    Forgot your password?
                                                </Link>
                                            </div> */}
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    Don&#39;t have an account ?{" "}
                                    <Link
                                        to="/register-seller"
                                        className="fw-medium text-primary"
                                    >
                                        {" "}
                                        Create new Seller{" "}
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

export default Login