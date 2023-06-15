import React, { useState } from 'react'
import "./NavSearch.css"
import { useNavigate } from "react-router-dom"
import logo from "../../../assets/img/shoppixo_logo.png"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { NavSearchValue, ClearNavSearchValue, } from "../../../redux/nav_search/action";
import { useDispatch, useSelector } from 'react-redux';

const NavSearch = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navSearchQuery = useSelector((state) => state.navSearchQuery)

    const handleSearchQuery = (event) => {
        const value = event.target.value;
        dispatch(NavSearchValue(value))
    }

    const handleClearNavSearchValue = () => {
        dispatch(ClearNavSearchValue())
    }

    return (
        <div className='nav-search-wrapper'>
            <div className="nav-logo-box" onClick={() => navigate("/")}>
                <img className='nav-logo' src={logo} alt="" />
            </div>
            <div className="nav-search-box">
                <p>All Products</p>
                <div className="input-box">
                    <input type="text" placeholder='Search' value={navSearchQuery} onChange={handleSearchQuery} />
                    <span style={{ minWidth: 24, marginTop: '-6px' }}>
                        {
                            navSearchQuery != '' && <CloseIcon className='search-cross' onClick={handleClearNavSearchValue} />
                        }
                    </span>
                    <SearchIcon />
                </div>
            </div>
            <div className="voice-search-btn">
                <GraphicEqIcon />
            </div>
        </div>
    )
}

export default NavSearch