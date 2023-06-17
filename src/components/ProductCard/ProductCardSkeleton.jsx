import React, { useState } from 'react'
import "./ProductCard.css"
import "./ProductCardSkeleton.css"
import { Skeleton } from '@mui/material';

const ProductCardSkeleton = (props) => {

    return (
        <div className="product-card-wrapper" style={{ height: '355px' }}>
            <div className="product-card-image-box">
                <Skeleton className="product-card-image product-card-image_skeleton" />
            </div>
            <div className="product-card-body">
                <Skeleton className="prod-title p-hover" />
                <Skeleton className="prod-description p-hover" />
                <br />
                <Skeleton className="prod-price prod-price_skeleton" />
            </div>

            <div className="prod_cart_option d-flex justify-content-between">
                <div className="buttons_opt">
                    <Skeleton
                        className="m_btn"
                    />
                    <Skeleton className="cart_item cart_item_skeleton" />
                    <Skeleton className="m_btn" />
                </div>
                <div className="cart_btn_div" style={{ zIndex: 999 }}>
                    <Skeleton className={"btn cart_btn btn_cart_btn_skeleton"} />
                </div>
            </div>
        </div>
    )
}

export default ProductCardSkeleton