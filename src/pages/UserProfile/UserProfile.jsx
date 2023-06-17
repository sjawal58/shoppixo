/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react"
import {
    Container, Row, Col, Button, Card, CardBody, Form, Input, CardHeader, Label,
} from "reactstrap"
import ButtonSpinner from "../../components/Common/ButtonSpinner"
import { withTranslation } from "react-i18next"
import Breadcrumb from 'components/Common/Breadcrumb';
import { useHistory } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { CKEditor } from "ckeditor4-react";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify"
import RefreshIcon from '@mui/icons-material/Refresh'
import axios from "axios";
import { URL } from "env";

const UserProfile = () => {
    const hitory = useHistory();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        const user_id = JSON.parse(localStorage.getItem('usersdata'))?._id;

        await axios({
            method: 'GET',
            url: URL + `/admin/${user_id}`,
        }).then((response) => {
            console.log("getUserData-response", response)
            setUserData(false)
            const allOrders = response.data.data;
            setUserData(allOrders)
        }).catch((error) => {
            console.log("getUserData-response-error", error)
        })
    }

    return (
        <Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb
                        breadcrumbTitle={"User Profile"}
                        parent={"Profile"}
                        breadcrumbActive={"User"}
                    />
                    <Card className='card_border'>
                        <CardBody>
                            <Row>
                                <Col className="mb-3" md={6}>
                                    <Label for="">{"First Name"}</Label>
                                    <Input value={userData?.firstname} readOnly />
                                </Col>
                                <Col className="mb-3" md={6}>
                                    <Label for="">{"Last Name"}</Label>
                                    <Input value={userData?.lastname} readOnly />
                                </Col>
                                <Col className="mb-3" md={6}>
                                    <Label for="">{"Full Name / Shop Name"}</Label>
                                    <Input value={userData?.firstname + " " + userData?.lastname} readOnly />
                                </Col>
                                <Col className="mb-3" md={6}>
                                    <Label for="">{"Email"}</Label>
                                    <Input value={userData?.email} readOnly />
                                </Col>
                                <Col className="mb-3" md={6}>
                                    <Label for="">{"Role"}</Label>
                                    <Input value={userData?.role} readOnly />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default UserProfile