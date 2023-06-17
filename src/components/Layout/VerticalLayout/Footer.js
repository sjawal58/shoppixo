import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <div className="col-12">
              Copyright © {new Date().getFullYear()} Shoppixo Shoppping <span className="d-none d-sm-inline-block">
              {" "}<i className="mdi mdi-heart text-danger"></i> All Copyrights Reserved.</span>
            </div>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
