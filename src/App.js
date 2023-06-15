/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
// Import scss
import "./assets/scss/theme.scss"
import "./App.css"
import PropTypes from 'prop-types'
import { Switch, BrowserRouter as Router, Route, useHistory } from "react-router-dom"
import { connect, useSelector, useDispatch, } from "react-redux"
// Import Routes all
import { userRoutes, authRoutes } from "./routes"
import { ToastContainer, toast } from "react-toastify";
// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"
// layouts Format
import VerticalLayout from "./components/Layout/VerticalLayout"
import HorizontalLayout from "./components/Layout/HorizontalLayout"
import NonAuthLayout from "./components/Layout/NonAuthLayout"
import axios from "axios"
import { URL } from "./env"

const App = (props) => {
  const history = useHistory();

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()

  return (
    <React.Fragment>
      <ToastContainer style={{ zIndex: 99999 }} />

      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route?.path || ''}
              layout={NonAuthLayout}
              component={route?.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route?.path || ''}
              layout={Layout}
              component={route?.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
