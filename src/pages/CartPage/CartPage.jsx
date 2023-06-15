/* eslint-disable no-unused-vars */
import React, { useState, useEffect, } from 'react'
import './CartPage.css'
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import logo from "../../assets/img/shoppixo_logo.png"
import { Button, Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { incrementItemQuantity, decrementItemQuantity, removeItemFromCart, } from "../../redux/cart_page/CartPageAction"
import SweetAlert from "sweetalert2";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const CartPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isTokenAvailableState = useSelector((state) => state.tokenAvailable);

    const cartGrandTotal = useSelector((state) => state?.productsCart?.cartGrandTotal);
    const cartProducts = useSelector((state) => state?.productsCart?.cartItemsList);
    const sellersData = useSelector((state) => state?.sellersData?.sellersList);

    const cartSellerData = sellersData.filter(seller => cartProducts.some(prod => prod.seller_id == seller.seller_id));

    const handleQuantityIncrement = (cart_item) => {
        if (cart_item.quantity != undefined) {
            if (cart_item.quantity > 0) {
                dispatch(incrementItemQuantity({
                    product_id: cart_item.product_id,
                    quantity: cart_item.quantity + 1,
                    prod_price: cart_item.prod_price,
                }))
            }
        }
    }

    const handleQuantityDecrement = (cart_item) => {
        if (cart_item.quantity != undefined) {
            if (cart_item.quantity > 1) {
                dispatch(decrementItemQuantity({
                    product_id: cart_item.product_id,
                    quantity: cart_item.quantity - 1,
                    prod_price: cart_item.prod_price,
                }))
            } else {
                CartItemRemoveAlert(cart_item.product_id)
            }
        }
    }

    const CartItemRemoveAlert = (product_id) => {
        SweetAlert.fire({
            title: "Are you sure?",
            text: "Do you want to remove this Item from the Cart?",
            icon: "error",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                const removeItem = {
                    product_id: product_id,
                }
                dispatch(removeItemFromCart(removeItem))
            }
        });
    }

    return (
        <div className="app_container">
            <div className="cart_page-wrapper">
                {
                    cartProducts.length == 0 && (
                        <p className="cart-items-count">Shopping Cart List is Empty <Link to="/">Continue Shopping</Link></p>
                    )
                }
                {
                    cartSellerData.length > 0 && cartSellerData.map((cart_seller) => (
                        <Card className="cart_page-card-wrapper">
                            <CardBody>
                                <p className="cart-items-count">Shopping Cart ({cartProducts.length} {cartProducts.length <= 1 ? 'item' : 'items'})</p>
                                <div className="cart_page-card">
                                    <h5 className="cart-shop-title">{cart_seller?.fullname}</h5>
                                    {
                                        cartProducts?.map((cart_prod) => {
                                            return (
                                                cart_prod?.seller_id == cart_seller?.seller_id && (
                                                    <div className="cart_pg-detail">
                                                        <div className="cart-image-box">
                                                            <img src={cart_prod?.details?.image} alt={"cart_image"} />
                                                        </div>
                                                        <div className="cart-info-detail">
                                                            <p className='cart-name'>{cart_prod?.details?.name}</p>
                                                        </div>
                                                        <div className="cart-pricing-wrapper">
                                                            <div className="cart-pricing">
                                                                <p className='cart-item-price'><span className='p_title'>Price:</span> <span className='p_data'>{cart_prod?.prod_price}</span></p>
                                                                <p className='cart-item-price'><span className='p_title'>Total:</span> <span className='p_data'>{cart_prod?.itemQtyTotal}</span></p>
                                                            </div>
                                                            <div className="cart-prod-customize">
                                                                <div className="buttons_opt">
                                                                    <RemoveCircleOutlineIcon
                                                                        className="m_btn"
                                                                        onClick={() => handleQuantityDecrement(cart_prod)}
                                                                    />
                                                                    <span className="cart_item">
                                                                        {cart_prod?.quantity || 0}
                                                                    </span>
                                                                    <AddCircleOutlineIcon
                                                                        className="m_btn"
                                                                        onClick={() => handleQuantityIncrement(cart_prod)}
                                                                    />
                                                                </div>
                                                                <HighlightOffIcon className='cart-item-delete' onClick={() => CartItemRemoveAlert(cart_prod?.product_id)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        })
                                    }
                                </div>
                                <p className="cart-items-count mb-0 mt-3">Cart Grand Total: <span style={{ color: 'var(--color-primary)' }}> Rs {cartGrandTotal || 0}</span></p>
                            </CardBody>
                        </Card>
                    ))
                }
                {
                    cartProducts.length > 0 && (
                        <div className='checkout_button-box'>
                            <Button
                                className="checkout_button"
                                onClick={() => {
                                    if (isTokenAvailableState) {
                                        navigate('/checkout')
                                    } else {
                                        toast.warn('Please Login to your Account', {
                                            position: 'top-right',
                                        })
                                    }
                                }}
                            >
                                <span style={{ color: 'white' }}>Checkout</span>
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CartPage