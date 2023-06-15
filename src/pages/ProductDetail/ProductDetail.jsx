/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./ProductDeail.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Slider from "react-slick";
import { Button, Spinner } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLocation, useNavigate, } from "react-router-dom"
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../env";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, incrementItemQuantity, decrementItemQuantity, removeItemFromCart } from "../../redux/cart_page/CartPageAction";

// Images slider ke settings hain k kitnay images ak list ma dekhanay hain.
const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                dots: false,
                arrows: true,
            },
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 1,
                arrows: true,
            },
        },
        {
            breakpoint: 475,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
                arrows: true,
            },
        },
        {
            breakpoint: 375,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: true,
            },
        },
    ],
};

const ProductDetail_Static = (props) => {
    // products k saray images ke array

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isTokenAvailableState = useSelector((state) => state.tokenAvailable);
    const navSearchQuery = useSelector((state) => state.navSearchQuery)

    // Ye product ke id ha, jis ke detail show krne ha. 
    const product_id = location?.state?.product_id;

    const [productData, setProductData] = useState(null)

    // productsImages ko useState hook ka set kr dia ha, state management k liyay
    const [productsImagesList, setProductsImagesList] = useState([]);

    // jo image screen pr view/display krna ha. Iss ma productsImages ke array ma say pehla image set kr dia ha.
    const [displayedProductImage, setDisplayedProductImage] = useState(null);

    const [cartItem, setCartItem] = useState(0)

    const cardProductId = useSelector(
        (state) => state?.productsCart?.cartItemsList?.find((cart) => cart?.product_id == product_id)?.product_id
    );
    const cartItemQuantity = useSelector(
        (state) => state?.productsCart?.cartItemsList?.find((cart) => cart?.product_id == product_id)?.quantity
    );

    console.log('cartItemQuantity', cartItemQuantity)

    useEffect(() => {
        getProductData(product_id)
    }, [])

    const getProductData = async (productID) => {
        await axios({
            method: "GET",
            url: `${URL}/product/${productID}`,
            headers: {
                "Authorization": localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",
            }
        }).then((response) => {
            console.log("getProductData-response", response)
            const product_data = response.data.data;
            setProductData(product_data)
            setDisplayedProductImage(product_data?.image)

            // yahan pr gallery images ke arra bnay ge
            const galleryArr = [];
            galleryArr.push({ image: product_data?.image, })
            if (product_data?.product_gallery.length > 0) {
                product_data?.product_gallery.map(item => {
                    galleryArr.push({ image: item?.image })
                })
            }
            setProductsImagesList(galleryArr)
            console.log("galleryArr", galleryArr)
        }).catch((error) => {
            console.log("getProductData-response-error", error)
        })
    }

    console.log("productsImagesList", productsImagesList)

    const handleQuantityIncrement = () => {
        if (cartItemQuantity != undefined) {
            if (cartItemQuantity > 0) {
                dispatch(incrementItemQuantity({
                    product_id: product_id,
                    quantity: cartItemQuantity + 1,
                    prod_price: productData?.prod_price || 0,
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
                    prod_price: productData?.prod_price || 0,
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
                    seller_id: productData?.seller_id,
                    name: productData?.name,
                    image: productData?.image,
                    quantity: cartItem,
                    prod_price: productData?.prod_price,
                    description: productData?.description,
                }
                dispatch(addItemToCart(addItem))
                setCartItem(0);
            }
        }
    }

    return (
        <div className="app_container">
            {
                productData == null && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
                        <Spinner className='me-3' /> Loading Data, please wait.....
                    </div>
                )
            }
            {
                navSearchQuery == '' && (
                    <div className="product-detail-page">
                        <div className="product-detail-image_box">
                            <div className="product-detail-displayed-image_wrapper">
                                <div className="product-detail-displayed-image">
                                    <img src={displayedProductImage} alt={""} />
                                </div>
                            </div>
                            {
                                productsImagesList && productsImagesList.length > 0 && <div className="product-detail-displayed-other-images-wrapper">
                                    <Slider
                                        nextArrow={<ArrowForwardIosIcon className='product-detail-slider_arrow_icon' />}
                                        prevArrow={<ArrowBackIosIcon className='product-detail-slider_arrow_icon' />}
                                        {...settings}
                                    >
                                        {
                                            productsImagesList.map((item, index) => (
                                                <div key={index} className={`product-detail-displayed-other-images-box ${item.image.includes(displayedProductImage) ? "product-detail-imgb_selected" : "product-detail-imgb_not_selected"}`}>
                                                    <img src={item.image}
                                                        alt={item.image}
                                                        onClick={() => setDisplayedProductImage(item.image)}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                            }
                        </div>
                        <div className="product-detail-info_box_wrapper">
                            <div className="product-detail-info_box">
                                <p className="prod_d_info-title">{productData?.name}</p>
                                <p className="prod_d_info-price">{productData?.prod_price}</p>
                                <div className="prod_d_info-discount_box">
                                    {/* <p className="prod_d_info-discount_price">4000</p> */}
                                    {/* <p className="prod_d_info-discount_label">-10%</p> */}
                                </div>
                                <div className="prod_d_cart_buttons_wrapper mt-2">
                                    <div className="prod_d_quantity_box_wrapper">
                                        <p className="prod_d_quantity_title">Quantity</p>
                                        <div className="prod_d_quantity_box">
                                            <Button onClick={handleQuantityDecrement} disabled={productData == null}><RemoveIcon /></Button>
                                            <p className="prod_d_quantity">{cartItemQuantity || cartItem}</p>
                                            <Button onClick={handleQuantityIncrement} disabled={productData == null}><AddIcon /></Button>
                                        </div>
                                    </div>
                                    <div className="prod_d_cart_button">
                                        <Button className="prod_d_cart_button_buynow" disabled={!cartItemQuantity} onClick={() => {
                                            if (isTokenAvailableState) {
                                                navigate('/checkout')
                                            } else {
                                                toast.warn('Please Login first before buying!', {
                                                    position: 'top-right'
                                                })
                                            }
                                        }}>Buy Now</Button>
                                        <Button className="prod_d_cart_button_add_cart" onClick={handleAddToCartItem} disabled={productData == null}>
                                            {
                                                productData && cartItemQuantity == 0 && "Out of Stock"
                                            }
                                            {
                                                productData && cartItemQuantity != 0
                                                    && cardProductId == product_id
                                                    ? "Remove from Cart" : "Add To Cart"
                                            }
                                        </Button>
                                    </div>
                                </div>
                                <p className="product-detail-description" dangerouslySetInnerHTML={{ __html: productData?.description && productData?.description != 'undefined' ? productData?.description : "" }}></p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ProductDetail_Static;
