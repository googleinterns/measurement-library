import React, {useMemo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Navbar, Nav, Image, Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Router} from './Router.js';
import Logo from './logo.svg';
import './App.css';

/**
 * Computes the total number of items in the cart.
 * @param {ItemStore} items A {@link ItemStore} listing of items
 * to purchase and their desired quantity.
 * @return {number} The total quantity.
 */
function computeNumberOfItemsInCart(items) {
  let totalItems = 0;
  for (const item of Object.values(items)) {
    totalItems += item.quantity;
  }
  return totalItems;
}

/**
 * Creates wrapper component that wraps the entire site with common components
 * such as a header, navigation, and shopping cart.
 * @param {!ItemStore} items The items stored in the site state
 * @return {!JSX}
 */
const AppBase = function({items}) {
  const itemsInCart = useMemo(() => {
    return computeNumberOfItemsInCart(items);
  }, [items]);
  return (
    <div>
      <Navbar bg="light" className="px-lg-4" variant="light">
        <Navbar.Brand as={Link} to="/">
          <Image
            alt="Logo for Prints of Poe which features a black cat"
            className="cat-logo"
            src={Logo}
          />
          Prints of Poe
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/cart">
            <svg className="shopping-cart" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                // eslint-disable-next-line max-len
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
            <Badge
              className="shopping-cart-badge"
              variant={itemsInCart > 0 ? 'danger' : 'secondary'}
              pill
            >
              {itemsInCart}
            </Badge>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Router/>
    </div>
  );
};

AppBase.propTypes = {
  items: PropTypes.object,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export const App = connect(mapStateToProps)(AppBase);
