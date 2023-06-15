/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './CheckoutPage.css'
import { Button, Card, CardBody, Col, Row, Spinner, Accordion, AccordionBody, AccordionHeader, AccordionItem, } from "reactstrap"
import { Form, } from "react-bootstrap";
import axios from 'axios'
import { URL } from '../../env'
import { useDispatch, useSelector, } from "react-redux"
import { Link, useNavigate, } from "react-router-dom"
import NavbarCart from '../../components/Header/NavbarCart/NavbarCart';
import stripe_logo from '../../assets/img/stripe.png';
import cod_logo from '../../assets/img/cod.png';
import { toast } from 'react-toastify';
import { deleteFullCart } from '../../redux/cart_page/CartPageAction';
import { useEffect } from 'react';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deliveryAddress = useSelector((state) => state.deliveryAddress);
    const cartProducts = useSelector((state) => state?.productsCart?.cartItemsList);
    const [loginBtnLoading, setLoginBtnLoading] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    console.log('CheckoutPage-deliveryAddress', deliveryAddress)

    const cartGrandTotal = useSelector((state) => state?.productsCart?.cartGrandTotal);
    const sellersData = useSelector((state) => state?.sellersData?.sellersList);
    const cartSellerData = sellersData.filter(seller => cartProducts.some(prod => prod.seller_id == seller.seller_id));

    const [openPayment, setOpenPayment] = useState('1');
    const togglePayment = (id) => {
        if (openPayment == id) {
            // setOpenPayment();
        } else {
            setOpenPayment(id);
        }
    };

    useEffect(() => {
        if(isOrderPlaced == false && cartProducts.length == 0) {
            navigate('/cart')
        }
    }, [])

    const handleProceedToShipping = () => {
        let paymentMethod = '';
        if (openPayment == '1') {
            paymentMethod = 'Cash on Devilery (COD)';
        } else if (openPayment == '1') {
            paymentMethod = 'Master Card / Stripe';
        } else {
            paymentMethod = 'Cash on Devilery (COD)';
        }

        const user_id = localStorage.getItem('user_id');

        const newOrderData = [];
        cartSellerData.map((cart_seller) => {
            cartProducts.map((cart_prod) => cart_prod?.seller_id == cart_seller?.seller_id && newOrderData.push({
                details: {
                    name: cart_prod?.details?.name,
                    image: cart_prod?.details?.image,
                },
                product_id: cart_prod?.product_id,
                prod_price: cart_prod?.prod_price,
                quantity: cart_prod?.quantity,
                itemQtyTotal: cart_prod?.itemQtyTotal,

                seller_id: cart_seller?.seller_id,
                seller_name: cart_seller?.fullname,
                order_status: 0,
            }))
        })


        if (user_id) {
            const fromData = {
                customer_id: user_id,
                payment_method: paymentMethod,
                delivery_address: deliveryAddress,
                orders_list: newOrderData,
            }
            console.log("handleProceedToShipping-fromData", fromData);

            handlePlaceOrder(fromData)
        } else {
            toast.error("User Id not Found", {
                position: "top-right"
            });
        }
    }

    const handlePlaceOrder = async (formData) => {
        setLoginBtnLoading(true)

        await axios({
            method: "POST",
            url: URL + `/order/create`,
            headers: {
                "Authorization": localStorage.getItem("token123"),
                "Content-Type": "application/json",
            },
            data: JSON.stringify(formData),
        }).then((response) => {
            console.log('handlePlaceOrder-response', response)
            const data = response?.data?.data;
            if (response?.data?.status == true) {
                setIsOrderPlaced(true)
                toast.success("Order Placed Successfully", {
                    position: "top-right"
                });
                dispatch(deleteFullCart());
            } else {
                toast.error("Failed to Place Order", {
                    position: "top-right"
                });
            }
            setLoginBtnLoading(false)
        }).catch((error) => {
            console.log('handlePlaceOrder-response-error', error.response)
            if (error.response?.data?.message) {
                toast.error(error.response.data.message, {
                    position: "top-right"
                });
            } else if (error?.message) {
                toast.error(error?.message, {
                    position: "top-right"
                });
            } else {
                toast.error("Failed to Place Order", {
                    position: "top-right"
                });
            }
            setLoginBtnLoading(false)
        })
    }

    return (
        <div className="app_container">
            {
                deliveryAddress?.isDevileryAddress ? (
                    cartProducts?.length > 0 ? (
                        <div className='checkout_page-wrapper'>
                            <Card className='mb-4'>
                                <CardBody>
                                    <div className="delivery-information-box">
                                        <p style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: 8, }}>Delivery/Shipping Address Details</p>
                                        <Row>
                                            <Col className='mb-2' xs="12" sm="6" md="6">
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Name" readOnly value={localStorage.getItem("username") || (deliveryAddress?.full_name)} />
                                                </Form.Group>
                                            </Col>
                                            <Col className='mb-2' xs="12" sm="6" md="6">
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Email Address</Form.Label>
                                                    <Form.Control type="email" placeholder="Email" readOnly value={deliveryAddress?.email} />
                                                </Form.Group>
                                            </Col>
                                            <Col className='mb-2' xs="12" sm="12" md="12">
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Delivery Address</Form.Label>
                                                    <Form.Control type="text" placeholder="Delivery Address" readOnly value={deliveryAddress?.address} />
                                                </Form.Group>
                                            </Col>
                                            <Col className='mb-2' xs="12" sm="6" md="6">
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Province</Form.Label>
                                                    <Form.Control type="text" placeholder="Province" readOnly value={deliveryAddress?.province} />
                                                </Form.Group>
                                            </Col>
                                            <Col className='mb-2' xs="12" sm="6" md="6">
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control type="text" placeholder="Province" readOnly value={deliveryAddress?.city} />
                                                </Form.Group>
                                            </Col>
                                            <Col className='mb-2' xs="12" sm="6" md="6">
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control type="text" placeholder="Phone Number" readOnly value={deliveryAddress?.phone_number} />
                                                </Form.Group>
                                            </Col>
                                            <Col className='mb-2' xs="12" sm="6" md="6">
                                                <Form.Group className="mb-0" controlId="formBasicEmail">
                                                    <Form.Label>Label for effective Delivery</Form.Label>
                                                    <Form.Select
                                                        defaultValue={deliveryAddress?.delivery_label}
                                                    >
                                                        <option value="" disabled selected>Choose label</option>
                                                        <option value="1" disabled>Home</option>
                                                        <option value="2" disabled>Office</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                            {
                                cartProducts?.length > 0 && (
                                    <Card className='mb-4'>
                                        <CardBody style={{ position: 'relative' }}>
                                            <NavbarCart
                                                deviceType={"Desktop"}
                                                productLength={cartProducts?.length || 0}
                                                opacity={1}
                                                positionBlock={true}
                                            />
                                        </CardBody>
                                    </Card>
                                )
                            }
                            <Card className='mb-4'>
                                <CardBody>
                                    <h6 className='mb-3'>Select Payment Method</h6>
                                    <Accordion className='checkout-payment-box' open={openPayment} toggle={togglePayment}>
                                        <AccordionItem>
                                            <AccordionHeader targetId="1" className={openPayment == '1' ? 'active' : ''}>
                                                <p>{"Cash on Delivery (COD)"}</p>
                                                <img src={cod_logo} alt="" />
                                            </AccordionHeader>
                                            <AccordionBody accordionId="1">
                                                <Card>
                                                    <CardBody>
                                                        <p className='mb-0'>Use cash on delivery</p>
                                                    </CardBody>
                                                </Card>
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId="2" className={openPayment == '2' ? 'active' : ''}>
                                                <p>{"Master Card / Stripe"}</p>
                                                <img src={stripe_logo} alt="" />
                                            </AccordionHeader>
                                            <AccordionBody accordionId="2">
                                                <Card>
                                                    <CardBody>
                                                        Master Card
                                                    </CardBody>
                                                </Card>
                                            </AccordionBody>
                                        </AccordionItem>
                                    </Accordion>
                                </CardBody>
                            </Card>
                            <Row className='justify-content-center'>
                                <Col xs='12' sm='9' md='6'>
                                    <div className="proceed-shipping-button-box">
                                        <Button
                                            className="proceed_shipping_btn"
                                            disabled={loginBtnLoading}
                                            style={{ fontSize: 22, position: 'relative' }}
                                            onClick={handleProceedToShipping}
                                        >
                                            {
                                                loginBtnLoading && (<Spinner style={{ height: 18, width: 18, marginRight: 6, color: 'white', }} />)
                                            }
                                            <span style={{ color: 'white' }}>Proceed to Shipping</span>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : isOrderPlaced == true && (
                        <div className='checkout_page-wrapper'>
                            <p>Order Placed Successfully <Link to={'/dashboard'} style={{ color: 'var(--color-primary)' }}>View Order</Link></p>
                        </div>
                    )
                ) : (
                    <div className='checkout_page-wrapper'>
                        <p className='checkout-dellivery-add'>
                            <span>Delivery Address not Added Completely</span>
                            (<Link to='/profile'>Add Delivery</Link>)
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default CheckoutPage