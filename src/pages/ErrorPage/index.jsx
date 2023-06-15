import React from 'react'
import "./ErrorPage.css"
import ErrorPageImage from "../../assets/img/error_page.png"

const ErrorPage = () => {
    return (
        <div className="error_page-wrapper">
            <img className="error_image" src={ErrorPageImage} alt="error" />
        </div>
    )
}

export default ErrorPage