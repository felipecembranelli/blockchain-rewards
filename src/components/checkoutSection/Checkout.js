import React from "react"
import { Container, Row, Col } from "reactstrap"
import { connect } from "react-redux"
import { Link } from "gatsby"
import emptyCartSvg from "../../images/empty_cart.svg"
import mpesa from "../../images/mpesa.png"
import "./Checkout.css"

import Web3 from 'web3'
import DaiToken from '../../abis/DaiToken.json'
import {config} from '../../data/dataConfig'
import {clearCart} from "../../actions/cartActions"

function Checkout(props) {

  const placeOrder = async (amount) => {
    console.log("placeOrder")

    try {
			if (window.ethereum) {
				window.web3 = new Web3(window.ethereum)
				await window.ethereum.enable()
			  }
			  else if (window.web3) {
				window.web3 = new Web3(window.web3.currentProvider)
			  }
			  else {
				window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
			  }
	
        const web3 = window.web3
    
        const accounts = await web3.eth.getAccounts()

        let defaultAccount = accounts[0]
      
        const networkId = await web3.eth.net.getId()

        console.log("checkout - networkId:" + networkId)

        // Load DaiToken
        const daiTokenData = DaiToken.networks[networkId]

        if (daiTokenData) {
          const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
          
          console.log("checkout - transfer:" + defaultAccount)

          let adminAccount = config.adminAccount

          console.log("checkout - transfer to:" + adminAccount)

          daiToken.methods.approve(defaultAccount, amount).send({ from: defaultAccount }).on('transactionHash', (hash) => {
            daiToken.methods.transfer(adminAccount, amount).send({ from: defaultAccount }).on('transactionHash', (hash) => {
              console.log("placed order")

              props.clearCart()
            })
          })

        } 
        else {
          window.alert('DaiToken contract not deployed to detected network.')
        }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <section className="checkout-section pad">
      <Container>
        <form action="#" className="checkout-form" onSubmit={(event) => {
                event.preventDefault()
                let amount
                
                amount = props.total.toString()
                
                amount = window.web3.utils.toWei(amount, 'Ether')
                
                placeOrder(amount)
              }}>
          <Row className="justify-content-center">
            <Col lg="8">
              {props.cartItems.length > 0 ? (
                <div className="place-order">
                  <h4>Your Order</h4>
                  <div className="order-total">
                    <ul className="order-table">
                      <li>
                        Product <span>Total</span>
                      </li>
                      {props.cartItems.map(item => (
                        <li className="fw-normal" key={item.id}>
                          {item.name} x {item.quantity}{" "}
                          <span>{item.price * item.quantity} CEM</span>
                        </li>
                      ))}
                      <li className="total-price">
                        Total <span>{props.total} CEM</span>
                      </li>
                    </ul>

                    {/* <div className="mb-4 d-flex w-100 align-items-center mpesa">
                      <img
                        src={mpesa}
                        alt="mpesa"
                        className="d-none d-lg-block"
                      />
                      <input
                        type="text"
                        placeholder="Enter Your Mpesa number"
                        className="form-control ml-3"
                      />
                    </div> */}

                    <Row>
                      <Col md="12">
                        <div className="order-btn">
                          <button type="submit" className="site-btn place-btn">
                            Redeem
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              ) : (
                <Col lg="12 text-center">
                  <img
                    src={emptyCartSvg}
                    alt="empty cart"
                    style={{ maxHeight: "200px", maxWidth: "200px" }}
                  />
                  <p className="text-primary mt-4">
                    Your shopping cart is empty.
                  </p>
                  <div className="cart-buttons">
                    <Link to="/" className="primary-btn continue-shop">
                      Continue shopping
                    </Link>
                  </div>
                </Col>
              )}
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems,
    total: state.cart.total,
  }
}

const cartActions = { clearCart}

export default connect(mapStateToProps, cartActions)(Checkout)
