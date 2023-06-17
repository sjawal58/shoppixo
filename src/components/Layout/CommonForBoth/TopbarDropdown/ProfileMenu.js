/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import "../rightbar.css"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"

// users
import user1 from "./../../../../assets/images/users/user-4.jpg"
import axios from "axios"
import { URL } from "../../../../env"
import { toast } from "react-toastify"

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const history = useHistory();

  const [username, setusername] = useState("Admin")

  useEffect(() => {
    // localStorage.getItem("authUser")
    if (localStorage.getItem("usersdatatoken")) {
      const name = JSON.parse(localStorage.getItem("usersdata"))
      setusername(name?.firstname)
    }
  }, [])


  /** Dashboard sy logout */
  const handleLogoutAdmin = () => {
    axios.get(URL + "/logout-dashboard", {
      headers: {
        "Authorization": localStorage.getItem("usersdatatoken"),
      },
      credentials: "include", /** This is used because we are also removing our cookie. */
    }).then((response) => {
      /** Jab reponse success ho jay ga to (.then) call ho ga */
      console.log("logout-response", response);
      localStorage.removeItem("usersdatatoken"); // removing token
      localStorage.removeItem("usersdata"); // removing token
      localStorage.clear();


      history.push("/login");
    }).catch((error) => {
      /** Agr reponse success na hoa, to (.catch) call ho ga, is ma error sow hotay hain */
      console.log("logout-response-error", error);
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message, {
          position: "top-right"
        })
      } else {
        toast.error("Something wents wrong", {
          position: "top-right"
        })
      }
    })
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle_ rounded-3 header-profile-user"
            src={user1}
            alt="Header Avatar"
            style={{ height: 35, width: 35 }}
          />
          <span className="user_profile_name_wrapper">
            <span className="user_profile_name">
              <span className="ms-2 u_name">{username}</span>
              <i className="mdi mdi-chevron-down"></i>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-center dropdown-menu-end_ boxshadow_v1">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <span to="/login" className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleLogoutAdmin}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </span>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}


export default (withTranslation()(ProfileMenu))
