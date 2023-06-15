import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem, } from "reactstrap"

const Breadcrumb = props => {
  const [setting_Menu, setsetting_Menu] = useState(false)

  return (
    <Row className="align-items-center">
      <Col sm={6}>
        <div className="page-title-box">
          {props.breadcrumbTitle && props.breadcrumbTitle != "" ? (
            <h4 className="font-size-24 text-dark">{props.breadcrumbTitle}</h4>
          ) : (
            props.title ? <h4 className="font-size-24 text-dark">{props.title}</h4>
              : <h4 className="font-size-24 text-dark">{props.breadcrumbActive}</h4>
          )}
        </div>
      </Col>
      <Col sm={6}>
        <div className="float-end d-none d-md-block">
          <div className="page-title-box">
            <ol className="breadcrumb mb-0">
              <BreadcrumbItem className="text-capitalize text-primary">
                <Link to={"/"}><b><i className="ti-home text-primary"></i></b></Link>
              </BreadcrumbItem>
              {
                (props.parent) ?
                  <>
                    <BreadcrumbItem className="text-capitalize text-dark">
                      {props.parent}
                    </BreadcrumbItem>
                  </> : ''
              }
              {
                (props.title) ?
                  <>
                    <BreadcrumbItem className="text-capitalize text-dark">
                      {props.title}
                    </BreadcrumbItem>
                  </> : ''
              }
              {
                (props.subtitle) ?
                  <>
                    <BreadcrumbItem className="text-capitalize text-dark">
                      {props.subtitle}
                    </BreadcrumbItem>
                  </> : ''
              }
              {
                (props.subtitle2) ?
                  <>
                    <BreadcrumbItem className="text-capitalize text-dark">
                      {props.subtitle2}
                    </BreadcrumbItem>
                  </> : ''
              }
              {
                (props.subtitle3) ?
                  <>
                    <BreadcrumbItem className="text-capitalize text-dark">
                      {props.subtitle3}
                    </BreadcrumbItem>
                  </> : ''
              }
              <BreadcrumbItem active>
                {props.breadcrumbActive}
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string
}

export default Breadcrumb
