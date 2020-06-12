import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Router} from './Router.js';
import Logo from './logo.svg';
import './App.css';

/**
 * @return {!JSX} Wrapper component that wraps the entire site with
 *     common components such as a header, navigation, and shopping cart.
 */
export function App() {
  return (
    <div>
      <Navbar bg="light" className="px-lg-4" variant="light">
        <Navbar.Brand as={Link} to="/">
          <img
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
          </Nav.Link>
        </Nav>
      </Navbar>
      <Router/>
    </div>
  );
}
