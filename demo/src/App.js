import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {Router} from './Router.js';

/**
 * Component to wrap the rest of the website with common components.
 * @return {!JSX} Returns site presentation for header, navigation,
 *     and shopping cart.
 */
export function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/product/123">Product</Link>
          </li>
          <li>
            <Link to="/thanks">Thanks</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
      </nav>
      <p>Shopping Site</p>
      <Router/>
    </div>
  );
}
