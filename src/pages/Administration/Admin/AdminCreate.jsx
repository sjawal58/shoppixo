/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react"
import {
    Container, Row, Col, Button, Card, CardBody, Form, Input, CardHeader, Label,
} from "reactstrap"
import ButtonSpinner from "../../../components/Common/ButtonSpinner"
import { withTranslation } from "react-i18next"
import Breadcrumb from 'components/Common/Breadcrumb';
import { useHistory } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify"
import axios from "axios";
import { URL } from "env";

const AdminCreate = () => {
    const hitory = useHistory();

    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({ shouldFocusError: true });

    const [btnLoading, setBtnLoading] = useState(false);

    const onSubmit = async (data) => {
        console.log("onSubmit-AdminCreate", data)

        const formData = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            role: "admin",
        }

        if (data.password == data.repeat_password) {
            setBtnLoading(true)

            await axios({
                method: "POST",
                url: `${URL}/admin-register`,
                headers: {
                    "Authorization": localStorage.getItem("usersdatatoken"),
                    "Content-Type": "application/json",
                },
                data: formData,
            }).then((response) => {
                console.log("response", response);
                toast.success("Admin Created!", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                setBtnLoading(false)
            }).catch((error) => {
                console.log("response-error:", error.response);
                if (error.response?.data?.message) {
                    toast.error(error.response?.data?.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                } else {
                    toast.error("Failed to Created Admin!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
                setBtnLoading(false)
            })
        } else {
            setError("repeat_password", {
                message: "Password does not match",
            }, { shouldFocus: true });
        }
    }

    const goBack = () => {
        hitory.push("/admins/list")
    };

    return (
        <Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb
                        breadcrumbTitle={"Create Admin"}
                        parent={"Administration"}
                        title={"Admins"}
                        breadcrumbActive={"Create"}
                    />
                    <Card className='card_border'>
                        <CardHeader className="d-flex justify-content-end">
                            <Button onClick={goBack} color="primary">{"Go Back"}</Button>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col className="mb-3" md={6}>
                                        <Label for="name">{"First Name"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='firstname'
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
                                            {errors.firstname?.type == "required" && "First Name is required"}
                                            {errors.firstname?.type == "maxLength" && "Maximum Length: " + "30"}
                                            {errors.firstname?.type == "minLength" && "Minumum Length: " + "3"}
                                            {errors.firstname?.type == "pattern" && "Please write alphanumeric values"}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="name">{"Last Name"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='lastname'
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
                                            {errors.lastname?.type == "required" && "Last Name is required"}
                                            {errors.lastname?.type == "maxLength" && "Maximum Length: " + "30"}
                                            {errors.lastname?.type == "minLength" && "Minumum Length: " + "3"}
                                            {errors.lastname?.type == "pattern" && "Please write alphanumeric values"}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="email">{"Email"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='email'
                                            rules={{
                                                required: true,
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
                                            {errors.email?.type == "pattern" && "Please enter valid email address"}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="password">{"Password"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='password'
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder={"Enter Password"}
                                                />
                                            )}
                                        />
                                        <span className="field_error">{errors.password && "Password is required"}</span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="repeat_password">{"Repeat Password"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='repeat_password'
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder={"Enter Password Again"}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.repeat_password?.type == "required" && "Repeat Password is required"}
                                            {errors.repeat_password?.message || ""}
                                        </span>
                                    </Col>
                                    <Col className="text-start" sm={12}>
                                        {/* <Button
                                            className="w-md"
                                            type="submit"
                                            color="success"
                                        >
                                            {"Submit"}
                                        </Button> */}
                                        <ButtonSpinner
                                            className="w-md"
                                            type="submit"
                                            color="success"
                                            text={"Submit"}
                                            loading={btnLoading}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default withTranslation()(AdminCreate)