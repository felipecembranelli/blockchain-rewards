import React, { useState } from "react"
import { Link } from "gatsby"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { connect } from "react-redux"

import emptyCartSvg from "../../images/empty_cart.svg"
import { removeFromCart } from "../../actions/cartActions"

import "./Navbar.css"
import Web3Wrapper from "../web3Wrapper/web3Wrapper"


const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar expand="md" fixed="top" style={{ 'background-color':"yellow", 'color': "black"}}>
        <Link to="/" className="navbar-brand" style={{ 'color': "black"}}>
          <span>e</span>-shop
        </Link>
        <Collapse isOpen={isOpen} navbar style={{ 'color': "black"}}>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ 'color': "black"}}>
                Account Info
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem> <Web3Wrapper /></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
        <div className="header__cart d-flex ml-auto" style={{ 'color': "black"}}>
          <Link to="#" className="nav-link" aria-label="view wishlist">
            <i className="fa fa-heart"></i>
            {props.wishlistItems.length > 0 && <span className="number">{props.wishlistItems.length}</span>}
          </Link>
          <div to="#" className="nav-link cart-icon" aria-label="view cart">
            <div>
              <i className="fa fa-shopping-bag"></i>

              {props.cartItems.length > 0 && (
                <span className="number">{props.cartItems.length}</span>
              )}
            </div>
            <div className="cart-hover">
              <div className="select-items">
                {props.cartItems.length > 0 ? (
                  <table>
                    <tbody>
                      {props.cartItems.map((item, index) => (
                        <tr key={index}>
                          <td className="si-pic">
                            <img src={item.src} alt="" />
                          </td>
                          <td className="si-text">
                            <div className="product-selected">
                              <p>
                                {item.price} x {item.quantity} CEM
                              </p>
                              <h6>{item.name}</h6>
                            </div>
                          </td>
                          <td
                            className="si-close"
                            onClick={() => {
                              props.removeFromCart(item)
                            }}
                          >
                            <i className="fa fa-close"></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center">
                    <img src={emptyCartSvg} alt="empty cart" />
                    <p className="mt-2 mb-3">Your shopping cart is empty.</p>
                  </div>
                )}
              </div>
              <div className="select-total">
                <span>total:</span>
                <h5>{props.total ? props.total : 0} CEM</h5>
              </div>
              <div className="select-button">
                <Link to="/shoping-cart" className="primary-btn view-card">
                  VIEW CART
                </Link>
                <Link to="/checkout" className="primary-btn checkout-btn">
                  CHECK OUT
                </Link>
              </div>
            </div>
          </div>
        </div>
        <NavbarToggler onClick={toggle} />
      </Navbar>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems,
    total: state.cart.total,
    wishlistItems: state.wishlist.wishlistItems
  }
}

export default connect(mapStateToProps, { removeFromCart })(NavBar)
