/* eslint-disable no-unused-vars */
import React from 'react'
import "./ProductsAdsPage.css"
import { AdsInfoFlashBox } from '../../components/ElementsUi'
import ProductCardSkeleton from '../../components/ProductCard/ProductCardSkeleton';
import AdsInfoFlashBoxSkeleton from '../../components/ElementsUi/UI-Kits/AdsInfoFlashBoxSkeleton';

const ProductsAdsPageSkeleton = (props) => {

    const { className, style, adsFlashList, productList, } = props;

    return (
        <div className={`products_ads-page-wrapper ${className}`} style={style}>
            {
                adsFlashList && (
                    <div className="ads-info-flash-header">
                        <div className="AdsInfoFlashBox-box">
                            <AdsInfoFlashBoxSkeleton />
                        </div>
                    </div>
                )
            }
            <div className="products_ads-products-wrapper">
                <div className="row mx-0">
                    {
                        productList.length > 0 && productList.map((item) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <ProductCardSkeleton />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductsAdsPageSkeleton