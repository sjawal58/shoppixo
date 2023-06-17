/* eslint-disable no-unused-vars */
import React from 'react'
import "./ProductsAdsPage.css"
import { AdsInfoFlashBox } from '../../components/ElementsUi'
import ProductCard from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';

const ProductsAdsPage = (props) => {

    const { className, style, cardSettings, adsFlashList, categoryName, productList, } = props;
    // const { adsFlashImage, adsFlashTitle, adsFlashDescription, } = adsFlashList;

    return (
        <div className={`products_ads-page-wrapper ${className}`} style={style}>
            <div className="ads-info-flash-header">
                {
                    adsFlashList?.adsFlashShow && (
                        <div className="AdsInfoFlashBox-box">
                            <AdsInfoFlashBox image={adsFlashList?.adsFlashImage || null} title={adsFlashList?.adsFlashTitle} description={adsFlashList?.adsFlashDescription} />
                        </div>
                    )
                }
                {
                    adsFlashList?.subFlashShow && (
                        <div className="AdsInfoFlashBox-box">
                            <AdsInfoFlashBox image={adsFlashList?.subFlashImage || null} title={adsFlashList?.subFlashTitle} description={adsFlashList?.subFlashDescription} />
                        </div>
                    )
                }
                {
                    adsFlashList?.adsFlashShow == false && adsFlashList?.subFlashShow == false && (
                        <div className="AdsInfoFlashBox-box">
                            <AdsInfoFlashBox image={null} title={categoryName} description={''} />
                        </div>
                    )
                }
            </div>
            {/* {
                adsFlashList && adsFlashList.length > 0 && (
                    <div className="ads-info-flash-header">
                        {
                            adsFlashList.map((item) => (
                                (item?.adsFlashImage || item?.adsFlashTitle || item?.adsFlashDescription) && (
                                    <div className="AdsInfoFlashBox-box">
                                        <AdsInfoFlashBox image={item.adsFlashImage} title={item.adsFlashTitle} description={item.adsFlashDescription} />
                                    </div>
                                )
                            ))
                        }
                    </div>
                )
            } */}
            <div className="products_ads-products-wrapper">
                <div className="row mx-0">
                    {
                        productList.length > 0 && productList.map((item, index) => index < 8 && (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <ProductCard
                                    product_id={item._id}
                                    image={item.image}
                                    name={item.name}
                                    description={item.description}
                                    prod_price={item.prod_price}
                                    cardSettings={cardSettings}
                                    seller_id={item.seller_id}
                                />
                            </div>
                        ))
                    }
                    {
                        productList.length >= 8 && (
                            <div className='text-center'>
                                <Link to={'products/' + categoryName} style={{ color: 'var(--color-primary)', fontSize: 12 }}>View All</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductsAdsPage