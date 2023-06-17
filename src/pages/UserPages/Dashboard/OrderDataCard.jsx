/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './Dashboard.css';
import logo from '../../../assets/img/shoppixo_logo.png'
import { Card, CardBody, CardHeader, Col, Row, } from 'reactstrap'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment/moment';

const OrderDataCard = (props) => {
    const { orderNo, createdDate, ordersList = [], delivery_address, } = props;

    const [showTab, setShowTab] = useState(false)

    return (
        <Card className='dash_ord-card'>
            <CardHeader className='px-0'
                style={{ display: 'flex', cursor: 'pointer', backgroundColor: '#00000020' }}
                onClick={() => setShowTab(!showTab)}>
                <div className='dash_ord-header px-2'>
                    <h6 className='mb-0'>Order Number #{orderNo}</h6>
                    <h6 className='mb-0'>Dated: <span style={{ color: 'var(--color-primary)' }}>{moment(createdDate).format('DD-MM-YYYY')}</span></h6>
                </div>
                <KeyboardArrowDownIcon style={{ transition: '0.25s', transform: showTab ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </CardHeader>
            <CardBody className={`dash_ord-body ${showTab ? 'dash_ord-body-show' : 'dash_ord-body-hide'}`}>
                {
                    ordersList.length > 0 && ordersList.map((item) => (
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
                            <span>Name:</span> {delivery_address?.full_name}
                        </Col>
                        <Col sm='12' md='6' lg='4'>
                            <span>Email:</span> {delivery_address?.email}
                        </Col>
                        <Col sm='12' md='6' lg='4'>
                            <span>Phone No.:</span> {delivery_address?.phone_number}
                        </Col>
                        <Col sm='12' md='6' lg='4'>
                            <span>Delivery At:</span> {delivery_address?.delivery_label == '2' ? 'Office' : 'Home'}
                        </Col>
                        <Col sm='12' md='12' lg='8'>
                            <span>Address:</span> {delivery_address?.address}
                        </Col>
                    </Row>
                </div>
            </CardBody>
        </Card>
    )
}

export default OrderDataCard