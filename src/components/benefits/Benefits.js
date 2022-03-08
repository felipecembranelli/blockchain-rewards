import React from "react"
import { Row, Col } from "reactstrap"

import "./Benefits.css"

export default function Benefits() {
  return (
    <div className="benefit-items mx-3">
      <Row>
      <Col md="4">
          <div className="single-benefit">
            <div className="sb-icon">
              <img src={require("../../images/icons/icon-3.png")} alt="" />
            </div>
            <div className="sb-text">
              <h6>Buy</h6>
              <p>Pay using your coins</p>
            </div>
          </div>
        </Col>
        <Col md="4">
          <div className="single-benefit">
            <div className="sb-icon">
              <img src={require("../../images/icons/icon-1.png")} alt="" />
            </div>
            <div className="sb-text">
              <h6>It's reliable</h6>
              <p>Blockchain based technology</p>
            </div>
          </div>
        </Col>
        <Col md="4">
          <div className="single-benefit">
            <div className="sb-icon">
              <img src={require("../../images/icons/icon-2.png")} alt="" />
            </div>
            <div className="sb-text">
              <h6>It's fast!</h6>
              <p>Place order using smart contracts</p>
            </div>
          </div>
        </Col>
        
      </Row>
    </div>
  )
}
