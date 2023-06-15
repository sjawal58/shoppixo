/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react"
import './OrderView.css';
import {
    Container, Row, Col, Button, Card, CardBody, Form, Input, CardHeader, Label,
} from "reactstrap"
import ButtonSpinner from "../../../components/Common/ButtonSpinner"
import { withTranslation } from "react-i18next"
import Breadcrumb from 'components/Common/Breadcrumb';
import { useHistory, useParams, Link } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify"
import axios from "axios";
import { URL } from "../../../env";
import SweetAlert from "sweetalert2";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment/moment';
import logo from '../../../assets/images/shoppixo_logo.png'

const OrderView = () => {
    const history = useHistory();
    const params = useParams()

    const orderID = params?.order_id || 0;

    const [orderData, setOrderData] = useState([])
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        getOrderById();
    }, [])

    const getOrderById = async () => {
        setDataLoading(true)
        await axios({
            method: 'GET',
            url: URL + `/order/${orderID}`,
        }).then((response) => {
            console.log("getOrderById-response", response)
            setDataLoading(false)
            const order = response.data.data;
            setOrderData(order)
        }).catch((error) => {
            console.log("getOrderById-response-error", error)
            setDataLoading(false)
            toast.error("Failed to get Data", {
                position: "top-right"
            })
        })
    }

    return (
        <Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb
                        breadcrumbTitle={"Orders View"}
                        parent={"Ecommerce"}
                        title={"Orders"}
                        breadcrumbActive={"View"}
                    />
                    <Card className='card_border'>
                        <CardHeader className="d-flex justify-content-end py-3">
                            <Button onClick={() => history.push("/orders/list")} color="primary">{"Go Back"}</Button>
                        </CardHeader>
                    </Card>
                    <Card className='dash_ord-card'>
                        <CardHeader className='px-0'
                            style={{ display: 'flex', backgroundColor: '#00000020' }}>
                            <div className='dash_ord-header px-2'>
                                <h6 className='mb-0'>Order Number #{orderData?._id}</h6>
                                <h6 className='mb-0'>Dated: <span style={{ color: 'var(--color-primary)' }}>{moment(orderData?.createdAt).format('DD-MM-YYYY')}</span></h6>
                            </div>
                        </CardHeader>
                        <CardBody className={`dash_ord-body dash_ord-body-show}`}>
                            {
                                orderData?.orders_list?.length > 0 && orderData?.orders_list.map((item) => (
                                    <div className="dash_ord_info">
                                        <img src={item?.details?.image}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null; // prevents looping
                                                e.currentTarget.src = logo;
                                            }} alt="" />
                                        <div>
                                            <div className='dash_ord-info-item'>
                                                <p>Name</p>
                                                <p>{item?.details?.name}</p>
                                            </div>
                                            <div className='dash_ord-info-item'>
                                                <p>Price</p>
                                                <p>Rs {item?.prod_price}</p>
                                            </div>
                                            <div className='dash_ord-info-item'>
                                                <p>Quantity</p>
                                                <p>{item?.quantity}</p>
                                            </div>
                                            <div className='dash_ord-info-item'>
                                                <p>Sub Total</p>
                                                <p>{item?.itemQtyTotal}</p>
                                            </div>
                                            <div className='dash_ord-info-item'>
                                                <p>Seller</p>
                                                <p>{item?.seller_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="dash_ord-delivery-info">
                                <Row>
                                    <Col sm='12' md='6' lg='4'>
                                        <span>Name:</span> {orderData?.delivery_address?.full_name}
                                    </Col>
                                    <Col sm='12' md='6' lg='4'>
                                        <span>Email:</span> {orderData?.delivery_address?.email}
                                    </Col>
                                    <Col sm='12' md='6' lg='4'>
                                        <span>Phone No.:</span> {orderData?.delivery_address?.phone_number}
                                    </Col>
                                    <Col sm='12' md='6' lg='4'>
                                        <span>Delivery At:</span> {orderData?.delivery_address?.delivery_label == '2' ? 'Office' : 'Home'}
                                    </Col>
                                    <Col sm='12' md='12' lg='8'>
                                        <span>Address:</span> {orderData?.delivery_address?.address}
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default OrderView