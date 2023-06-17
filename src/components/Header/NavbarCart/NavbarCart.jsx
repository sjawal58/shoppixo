import React from 'react'
import "./NavbarCart.css";
import styled from "@emotion/styled";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "react-bootstrap";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/shoppixo_logo.png"
import { removeItemFromCart } from "../../../redux/cart_page/CartPageAction";
import SweetAlert from "sweetalert2";
import { toast } from 'react-toastify';

const NavbarCartBox = styled("div")`
  background-color: #ffffff;
  position:  ${(props) => (props.positionBlock ? "initial" : "absolute")};
  width: ${(props) => (props.positionBlock ? "100%" : "400px")};
  top: 45px;
  left: 0;
  transform: ${(props) => (props.positionBlock ? 'translateX(0)' : 'translateX(-86%)')};
  padding: 1rem 0.75rem;
  border-radius: 6px;
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px; */
  box-shadow: ${(props) => (!props.positionBlock && `rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px`)};
  border: 1px solid #00000010;
  padding-bottom: ${(props) => (props.positionBlock && '0px')};
  cursor: default !important;
  z-index: 99999;
  opacity: ${(props) => props.opacity};
  transition: all 1.25s ease-in-out;

  & > strong {
    color: red;
  }
  & > p {
    font-family: Poppins;
    font-size: 15px;
  }
  & > .nav_sub_total {
    display: flex;
    justify-content: space-between;
    padding: 15px 4px;
  }
  & > .nav_sub_total p {
    margin-bottom: 0px;
    color: #000000;
    font-family: Poppins;
  }
  & > .nav_sub_total p:nth-child(1) {
    font-size: 15px;
    font-weight: 600;
  }
  & > .nav_sub_total p:nth-child(2) {
    font-size: 17px;
    font-weight: 700;
  }
  & > .navcart_buttons_wrapper {
    padding: 0px 4px;
    display: flex;
    justify-content: space-between;
  }
  & > .navcart_buttons_wrapper button {
    border-radius: 30px;
    border: none;
    box-shadow: none;
    outline-color: none;
    padding-top: -4px;
    font-size: 12px;
    padding-left: 6px !important;
    padding-right: 6px !important;
    height: 38px;
    display: flex;
    font-weight: 700;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: var(--color-primary);
  }
  & > .navcart_buttons_wrapper button:hover {
    opacity: 0.9;
}
  & > .navcart_buttons_wrapper button:first-child {
    margin-right: 3px;
  }
  & > .navcart_buttons_wrapper button:last-child {
    margin-left: 3px;
  }
  @media (max-width: 991.98px) {
    transform: ${(props) => (props.positionBlock ? 'translateX(0)' : 'translateX(-85%)')};
    top: 40px;
  }
  @media (max-width: 800px) {
    top: initial;
    bottom: 66px;
    transform: ${(props) => (props.positionBlock ? 'translateX(0)' : 'translateX(-82%)')};
  }
  @media (max-width: 444px) {
    width: 300px;
    transform: ${(props) => (props.positionBlock ? 'translateX(0)' : 'translateX(-78%)')};
    & > .navcart_buttons_wrapper button {
      line-height: 1.6 !important;
      font-size: 14px !important;
      margin-left: 2px;
      margin-right: 2px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
  @media (max-width: 325px) {
    width: 270px;
    transform: translateX(-78%);
  }

  @media (max-width: 290px) {
    width: 260px;
    transform: translateX(-75%);
  }
`;

const NavbarCartItemWrapper = styled("div")`
  width: 100%;
  max-height: ${(props) => (props.productLength > 3 ? "250px" : "auto")};
  overflow-y: ${(props) => (props.productLength > 3 ? "scroll" : "initial")};
  max-height: ${(props) => (props.positionBlock && '400px !important')};
  ::-webkit-scrollbar {
    width: 5px !important;
    height: 3px; 
    background: #ffd698;
  }
  ::-webkit-scrollbar-thumb {
    background: #ff5319;
  }
`;

const NavbarCartItem = styled("div")`
  border-bottom: 1px solid var(--color-primary);
  padding: 8px 0px;
  display: flex;
  width: 100%;
  align-items: center;

  & > .cart_detail_wrapper {
    width: 100%;
    font-family: Poppins;
    font-size: 14px;
    display: flex;
    align-items: center;
    position: relative;
  }
  & > .cart_detail_wrapper img {
    width: 100%;
    height: 100%;
  }
  & > .cart_detail_wrapper .cart_detail {
    padding-left: 6px;
    padding-right: 8px;
  }
  & > .cart_detail_wrapper .cart_detail h6:nth-child(1) {
    color: var(--color-primary);
    font-size: 14px;
    font-family: "Poppins-Bold";
    font-weight: 700;
    margin-right: 15px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  & > .cart_detail_wrapper .cart_detail h6:nth-child(2) {
    color: #000000;
    font-family: "Poppins";
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 0;
  }
  & > .cart_detail_wrapper .item_cancel_btn {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px !important;
    color: var(--color-primary) !important;
    cursor: pointer;
    z-index: 999999 !important;
  }
`;


const NavbarCart = (props) => {

  const { screenWidth, deviceType, productLength, opacity, positionBlock } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state?.productsCart?.cartItemsList);
  const cartGrandTotal = useSelector((state) => state?.productsCart?.cartGrandTotal);

  const handleRemoveItem = product => {
    if (positionBlock) {
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
            product_id: product?.product_id,
          }
          dispatch(removeItemFromCart(removeItem))
          toast.success('Item removed from the Cart!')
        }
      });
    } else {
      const removeItem = {
        product_id: product?.product_id,
      }
      dispatch(removeItemFromCart(removeItem))
    }
  }

  return productLength > 0 ? (
    <NavbarCartBox
      opacity={opacity ? opacity : 0}
      screenWidth={screenWidth}
      deviceType={deviceType}
      positionBlock={positionBlock}
    >
      <NavbarCartItemWrapper productLength={productLength}>
        {cartProducts.map((product) => {
          return (
            <NavbarCartItem>
              <div className="cart_detail_wrapper">
                <div
                  className="product_image_wrapper"
                  style={{
                    position: "relative", width: 60, minWidth: 60, height: 60,
                    minHeight: 60, border: '1px solid #b7b6b6'
                  }}
                >
                  {product?.details?.image == "undefined" ||
                    product?.details?.image == null ? (
                    <img
                      className="product_image"
                      src={logo}
                      alt={`insta_1.png`}
                    />
                  ) : (
                    <img
                      className="product_image"
                      src={product?.details?.image}
                      alt={``}
                    />
                  )}
                </div>
                <div className="cart_detail">
                  <h6>
                    {product?.details?.name}
                  </h6>
                  <h6>
                    {product.quantity}
                    {" x Rs. "}
                    {product.prod_price}
                  </h6>
                </div>
                <CancelIcon
                  className="item_cancel_btn"
                  onClick={() => handleRemoveItem(product)}
                />
              </div>
            </NavbarCartItem>
          );
        })}
      </NavbarCartItemWrapper>
      <div className="nav_sub_total">
        <p>Subtotal:</p>
        <p>
          Rs {cartGrandTotal || 0}
        </p>
      </div>
      {
        !positionBlock && (<div className="navcart_buttons_wrapper">
          <Button
            onClick={() =>
              navigate(`/`, {
                state: { navCartClicked: true },
              })
            }
            style={{ padding: screenWidth < 450 ? "6px" : "0px" }}
          >
            {screenWidth < 450 ? (
              <ArrowBackIcon style={{ fontSize: 30 }} />
            ) : (
              "Continue Shopping"
            )}
          </Button>
          <Button
            onClick={() =>
              navigate(`/cart`, {
                state: { navCartClicked: true },
              })
            }
            style={{ padding: screenWidth < 450 ? "6px" : "" }}
          >
            {screenWidth < 450 ? (
              <ShoppingCartCheckoutIcon style={{ fontSize: 30 }} />
            ) : (
              "View Shopping Cart"
            )}
          </Button>
        </div>)
      }
    </NavbarCartBox>
  ) : (
    <NavbarCartBox
      opacity={opacity ? opacity : 0}
      screenWidth={screenWidth}
      deviceType={deviceType}
    >
      <p>{"No products are available in your shopping cart"}.</p>
      <div className="navcart_buttons_wrapper">
        <span></span>
        <Button onClick={() => navigate(`/`)}>
          {"Shop Now"}
        </Button>
      </div>
    </NavbarCartBox>
  );
}

export default NavbarCart