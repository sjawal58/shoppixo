/* eslint-disable no-unused-vars */
import React from 'react'
import "./Footer.css"
import { Form, Input } from "reactstrap";
import FooterLogo from "../../assets/img/shoppixo_logo.png"
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <div className="app_container">
                <div className="footer-content-wrapper">
                    <div className="footer-content">
                        <div className="footer-about">
                            <img className="footer-logo" src={FooterLogo} alt="" />
                            <p className="footer-description">
                                Succes isn't always about greatness. Its about consistency,
                                consistent hard work gains success. Greatness will come.
                            </p>
                        </div>
                    </div>
                    <div className="footer-content">
                        <div className="footer-info">
                            <h4 className="footer-title">Information</h4>
                            <ul className="footer-links-box">
                                <li className="footer-link"><a href="#">About Us</a></li>
                                <li className="footer-link"><a href="#">More Search</a></li>
                                <li className="footer-link"><Link to="/services">Services</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-content">
                        <div className="footer-help">
                            <h4 className="footer-title">Helpful Links</h4>
                            <ul className="footer-links-box">
                                <li className="footer-link"><Link to="/services">Services</Link></li>
                                <li className="footer-link"><a href="#">Supports</a></li>
                                <li className="footer-link"><a href="#">Terms & Condition</a></li>
                                <li className="footer-link"><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-content">
                        <div className="footer-contact">
                            <h4 className="footer-title">Contact Us</h4>
                            <a className="footer-mail mb-1" href="mailto:shoppixo.shopping@gmail.com">
                                <MailIcon />
                                <span>shoppixo.shopping@gmail.com</span>
                            </a>
                            <a className="footer-mail mb-3" href="mailto:shoppixo.shopping@gmail.com">
                                <PhoneIcon />
                                <span>shoppixo.shopping@gmail.com</span>
                            </a>
                        </div>
                    </div>
                    <div className="footer-content">
                        <div className="footer-subscribe">
                            <h4 className="footer-title">Subscribe More Info</h4>
                            <Form>
                                <div className="footer-subscribe-input">
                                    <span className="icon-box">
                                        <MailOutlinedIcon />
                                    </span>
                                    <Input type="text" class="form-control" placeholder={"Enter your Emai"} />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <p className="footer-copyright">
                    Copyright <b>©</b> {(new Date().getFullYear())} <a href="#">Shoppixo Shopping</a>. All copyrights reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer