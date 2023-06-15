/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./Home.css"
import NavSearch from '../../components/Header/NavSearch'
import TopNav from '../../components/Header/TopNav'
import HomeSlider from "../../components/HomeSlider"
import Categories from '../../components/Categories'
import { AdsInfoFlashBox } from "../../components/ElementsUi"
import ProductsAdsPage from '../ProductsAdsPage/ProductsAdsPage'
import ProductsAdsPageSkeleton from '../ProductsAdsPage/ProductsAdsPageSkeleton'
import { AddsFlash_List, homePagesProducts } from "../../database/HomeDB"
import HomeProductsDeals from './Contents/HomeProductsDeals'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../../env'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap';
import { GetAllProductsAction, AllProductsLoaderAction } from "../../redux/products/ProductsAction";

const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const MenFashion = "images/products/men-fashion.jpeg"

    const { categoriesList, isLoading } = useSelector((state) => state.categoriesList);
    const { productsList } = useSelector((state) => state.productsList);
    const productsListSkeleton = [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
    ];

    useEffect(() => {
    }, [])

    console.log("productsList", productsList)

    return (
        <div className='home-wrapper'>
            {/* <TopNav />
            <NavSearch /> */}
            <div className="hero-section-wrapper">
                <div className="hero-categories">
                    <Categories />
                </div>
                <div className="hero-sliderbox">
                    <HomeSlider />
                </div>
            </div>
            <div className="row mt-5 app_container">
                {
                    AddsFlash_List.map((item) => (
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                            <AdsInfoFlashBox
                                fullwidth
                                image={`${process.env.PUBLIC_URL}/${item.image}`}
                                title={item.title}
                                description={item.description}
                            />
                        </div>
                    ))
                }
            </div>

            {/* Yahan pr database walay product show hon gay, categories k hesab sy. */}
            {
                !isLoading && productsList.length > 0 ? productsList.map((item, index) => {
                    return (
                        item?.products.length > 0 && <>
                            <div className="app_container">
                                <ProductsAdsPage
                                    adsFlashList={{
                                        adsFlashShow: item?.category?.show_flash == "1" ? true : false,
                                        adsFlashImage: item?.category?.main_flash_image,
                                        adsFlashTitle: item?.category?.main_flash_title,
                                        adsFlashDescription: item?.category?.main_flash_text,
                                        subFlashShow: item?.category?.show_sub_flash == "1" ? true : false,
                                        subFlashImage: item?.category?.sub_flash_image,
                                        subFlashTitle: item?.category?.sub_flash_title,
                                        subFlashDescription: item?.category?.sub_flash_text,
                                    }}
                                    productList={item.products}
                                    categoryName={item?.category?.name}
                                    cardSettings={{
                                        allowButtons: true,
                                        buttonsHeight: true
                                    }}
                                />
                            </div>
                        </>
                    )
                }) : (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
                            <Spinner className='me-3' /> Loading Data, please wait.....
                        </div>
                        {
                            productsListSkeleton.map((item) => (
                                <div className="app_container">
                                    <ProductsAdsPageSkeleton
                                        adsFlashList={true}
                                        productList={item}
                                    />
                                </div>
                            ))
                        }

                    </>
                )
            }
        </div>
    )
}

export default Home