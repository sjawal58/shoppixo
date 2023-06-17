import React, { useState } from 'react'
import "./ProductCard.css"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, incrementItemQuantity, decrementItemQuantity, removeItemFromCart } from "../../redux/cart_page/CartPageAction";

const ProductCard = (props) => {
    const { image, name, description, prod_price, cardSettings, product_id, seller_id, } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const { buttonsHeight, allowButtons } = cardSettings;
    const [cartItem, setCartItem] = useState(0)

    const cardProductId = useSelector(
        (state) => state?.productsCart?.cartItemsList?.find((cart) => cart?.product_id == product_id)?.product_id
    );
    const cartItemQuantity = useSelector(
        (state) => state?.productsCart?.cartItemsList?.find((cart) => cart?.product_id == product_id)?.quantity
    );


    console.log("ProductPage-cartItemQuantity", cartItemQuantity)

    const handleProductClick = () => {
        navigate("/product-detail");
    }

    const handleQuantityIncrement = () => {
        if (cartItemQuantity != undefined) {
            if (cartItemQuantity > 0) {
                dispatch(incrementItemQuantity({
                    product_id: product_id,
                    quantity: cartItemQuantity + 1,
                    prod_price: prod_price,
                }))
            }
        } else {
            setCartItem(cartItem + 1)
        }
    }

    const handleQuantityDecrement = () => {
        if (cartItemQuantity != undefined) {
            if (cartItemQuantity > 0) {
                dispatch(decrementItemQuantity({
                    product_id: product_id,
                    quantity: cartItemQuantity - 1,
                    prod_price: prod_price,
                }))
                setCartItem(0);
            } else {
                const removeItem = {
                    product_id: product_id,
                }
                dispatch(removeItemFromCart(removeItem))
                setCartItem(0);
            }
        } else {
            if (cartItem > 0) {
                setCartItem(cartItem - 1)
            } else {
                setCartItem(0)
            }
        }
    }

    const handleAddToCartItem = () => {
        if (cartItemQuantity != undefined) {
            const removeItem = {
                product_id: product_id,
            }
            dispatch(removeItemFromCart(removeItem))
            setCartItem(0);
        } else {
            if (cartItem > 0) {
                const addItem = {
                    product_id: product_id,
                    seller_id: seller_id,
                    name: name,
                    image: image,
                    quantity: cartItem,
                    prod_price: prod_price,
                    description: description,
                }
                dispatch(addItemToCart(addItem))
                setCartItem(0);
            }
        }
    }

    return (
        <div className="product-card-wrapper" style={{ height: cardSettings?.buttonsHeight || cardSettings?.allowButtons ? '355px' : '320px' }}>
            <div className="product-card-image-box" onClick={handleProductClick}>
                <img className="product-card-image" src={image} alt="" />
            </div>
            <div className="product-card-body">
                <h5 className="prod-title p-hover" onClick={handleProductClick}>{name}</h5>
                <p className="prod-description p-hover" onClick={handleProductClick} dangerouslySetInnerHTML={{ __html: description && description != 'undefined' ? description : "" }}></p>
                <br />
                <p className="prod-price" onClick={handleProductClick}>{parseFloat(prod_price ? prod_price : 0).toFixed(2)}</p>
            </div>
            {
                cardSettings?.allowButtons && (
                    <div className="prod_cart_option d-flex justify-content-between">
                        <div className="buttons_opt">
                            <RemoveCircleOutlineIcon
                                className="m_btn"
                                onClick={handleQuantityDecrement}
                            />
                            <span className="cart_item">
                                {cartItemQuantity || cartItem}
                            </span>
                            <AddCircleOutlineIcon
                                className="m_btn"
                                onClick={handleQuantityIncrement}
                            />
                        </div>
                        <div className="cart_btn_div" style={{ zIndex: 999 }}>
                            <button className={"btn cart_btn"}
                                disabled={cartItemQuantity == 0}
                                onClick={handleAddToCartItem}>
                                {
                                    cartItemQuantity == 0 && "Out of Stock"
                                }
                                {
                                    cartItemQuantity != 0
                                        && cardProductId == product_id
                                        ? "Remove from Cart" : "Add To Cart"
                                }
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ProductCard