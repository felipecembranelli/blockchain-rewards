import React from "react"
import { Container, Row, Col } from "reactstrap"

import "./Categories.css"
export default function Categories() {
  return (
    <div className="banner-section">
      <Container fluid>
        <Row>
          <Col lg="4">
            <div className="single-banner">
              <img src={require("../../images/banner_bees1.jpg")} alt="" />
              <div className="inner-text">
                <h4>Draft</h4>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <div className="single-banner">
              <img src={require("../../images/banner_bees1.jpg")} alt="" />
              <div className="inner-text">
                <h4>IPA</h4>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <div className="single-banner">
              <img src={require("../../images/banner_bees1.jpg")} alt="" />
              <div className="inner-text">
                <h4>Pale Ale</h4>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
