/* eslint-disable no-unused-vars */
import React, { useState, useEffect, } from 'react'
import "./Categories.css";
import MenuIcon from '@mui/icons-material/Menu';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoriesDesk = () => {

    const { categoriesList, isLoading } = useSelector((state) => state.categoriesList);
    const [skeletonList, setSkeletonList] = useState([1, 2, 3, 4, 5, 6, 7]);

    return (
        <div className="categories-wrapper">
            <div className="categories-box">
                <p className="categories-title">
                    <span className='categories-logo'><MenuIcon /></span> All CATEGORIES
                </p>
                {
                    categoriesList && categoriesList.length > 0 && categoriesList.map((item) => (
                        <p className="categories-item"><Link to={'products/' + item?.name}>{item.name}</Link></p>
                    ))
                }
                {
                    isLoading && categoriesList?.length == 0 && skeletonList.length > 0 && skeletonList.map(item => (
                        <div className="categories-item">
                            <Skeleton animation="wave" variant="rounded" height={26} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoriesDesk