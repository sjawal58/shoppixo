import React, { useState, useEffect, } from 'react'
import "./TopNav.css"
import { Link, useNavigate } from "react-router-dom"
import { Dropdown } from 'react-bootstrap';
import CircularUserIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useDispatch, useSelector } from "react-redux"
import { isTokenAvailable } from "../../../redux/auth/tokens/token/action"
import { isTokenExpiryTime } from "../../../redux/auth/tokens/tokenexpire/action"
import { categoriesAction, categoriesLoaderAction } from "../../../redux/categories/CategoriesAction"
import { sellersAction } from "../../../redux/seller/SellersAction"
import getDeviceType from "../../Hooks/useDeviceDetector";
import getWindowDimensions from "../../Hooks/useWindowDimensions";
import NavbarCart from '../NavbarCart/NavbarCart';
import axios from "axios"
import { URL } from "../../../env"


const TopNav = () => {

    const navigate = useNavigate();
    const [display, setdisplay] = useState("none");

    const { screenWidth, screenHeight } = getWindowDimensions();
    const [ShowNavbarCart, setShowNavbarCart] = useState(false);
    const { deviceType } = getDeviceType();

    const dispatch = useDispatch();
    dispatch(isTokenAvailable());
    dispatch(isTokenExpiryTime());
    // dispatch(clearStorageOnTokenUnAvailable());
    const isTokenAvailableState = useSelector((state) => state.tokenAvailable);
    console.log("isTokenAvailableState", isTokenAvailableState)

    const cartProducts = useSelector((state) => state?.productsCart?.cartItemsList);

    useEffect(() => {
        dispatch(sellersAction())
        dispatch(categoriesLoaderAction())
        dispatch(categoriesAction())
    }, [])

    if (isTokenAvailableState == false) {
        localStorage.removeItem("token123");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("token_expiry_time");
        // localStorage.clear();
    }

    const handleLogoutUser = async () => {
        axios.get(URL + "/logout", {
            headers: {
                "Authorization": localStorage.getItem("token123"),
            },
            credentials: "include", /** This is used because we are also removing our cookie. */
        }).then((response) => {
            console.log("logout-response", response);
            localStorage.removeItem("token123"); // removing token
            localStorage.removeItem("username");
            localStorage.clear();
            navigate("/");
        }).catch((error) => {
            console.log("logout-response-error", error);
        })
    }

    const login_option = () => {
        setdisplay("block");
    }

    const login_option2 = () => {
        // display = "none";
        setdisplay("none");
    }

    const handleLoginDropdown = () => {

        const LoginDropdown_ID = document.getElementById("LoginDropdown_ID");
        const dropdown_custom_components = document.getElementById(
            "dropdown-custom-components"
        );
        console.log(
            "handleLoginDropdown-LoginDropdown_Toggle_ID",
            dropdown_custom_components.ariaExpanded
        );
        if (dropdown_custom_components) {
            // if (dropdown_custom_components.ariaExpanded == true) {
            LoginDropdown_ID.click();
            LoginDropdown_ID.classList.remove("show");
            dropdown_custom_components.ariaExpanded = false;
            // }
        }

        const LoginDropdown_Menu_ID = document.getElementById(
            "LoginDropdown_Menu_ID"
        );
        if (LoginDropdown_Menu_ID) {
            document.getElementById("LoginDropdown_Menu_ID").classList.remove("show");
        }
    };

    return (
        <div className='top-nav-wrapper'>
            <div className='login_option' style={{ display: display }}>
                <br />
                <h2>Choose Login Option</h2>
                <br /><br />
                <button className='login_option_btn' onClick={() => {
                    navigate("/login");
                    setdisplay("none");
                }}>Costumer Login</button>
                <br /><br />
                <a target='_blank' href='http://localhost:3001/login'>
                    <button className='login_option_btn' onClick={() => {
                        setdisplay("none");
                    }}>Shop Keeper Login</button>
                </a>
                <br /><br />
                <button className='login_option_btn2' onClick={login_option2}>Go Back</button>
            </div>
            <div className="top-mail-wrapper">
                <a className='top-mail' href="mailto:shoppixo.shopping@gmail.com">shoppixo.shopping@gmail.com</a>
            </div>
            <div className="top-main-menus-wrapper">
                <p className="t-menus" onClick={() => navigate("/")}>Home</p>
                <p className="t-menus" onClick={() => navigate("/services")}>Services</p>
                {/* <p className="t-menus">Help</p> */}
                <p className="t-menus" onClick={() => navigate("/contact")}>Contact</p>
            </div>
            <div className="top-right-menus">
                {
                    isTokenAvailableState && isTokenAvailableState == true &&
                    <Dropdown className='me-1'>
                        <Dropdown.Toggle variant="danger" id="dropdown-profile" className="dropdown_user_profile">
                            <CircularUserIcon className="nav_user_profile_ico" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item disabled>{localStorage.getItem("username") || "username"}</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate("/dashboard")}>Dashboard</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogoutUser}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
                {
                    isTokenAvailableState == undefined || isTokenAvailableState == false
                    && <p className="t-r-menus" onClick={login_option}>Login</p>
                }
                <div className="top-cart-wrapper">
                    {/* <p className="top-cart-btn">Cart</p> */}
                    <span
                        className="prod_cart_box_wrapper me-2"
                        onMouseEnter={() => {
                            deviceType == "Desktop" && setShowNavbarCart(true);
                            handleLoginDropdown();
                        }}
                        onMouseLeave={() => setShowNavbarCart(false)}
                        onClick={() =>
                            deviceType == "Mobile" &&
                            setShowNavbarCart(!ShowNavbarCart)
                        }
                    >
                        <span className="prod_cart_box">
                            <span className="prod_cart_box_icon_box">
                                <ShoppingBasketIcon className="prod_cart_box_icon" />
                            </span>
                            <span
                                className="prod_cart_item_count"
                            >
                                {cartProducts?.length || 0}
                            </span>
                            {ShowNavbarCart == true && (
                                <NavbarCart
                                    screenWidth={screenWidth}
                                    deviceType={deviceType}
                                    productLength={cartProducts?.length || 0}
                                    opacity={ShowNavbarCart ? 1 : 0}
                                />
                            )}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TopNav