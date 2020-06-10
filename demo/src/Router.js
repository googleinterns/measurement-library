import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import {AboutScreen} from './screens/AboutScreen/AboutScreen.js';
import {CartScreen} from './screens/CartScreen/CartScreen.js';
import {CheckoutScreen} from './screens/CheckoutScreen/CheckoutScreen.js';
import {HomeScreen} from './screens/HomeScreen/HomeScreen.js';
import {ProductScreen} from './screens/ProductScreen/ProductScreen.js';
import {ThankScreen} from './screens/ThankScreen/ThankScreen.js';

/**
 * @return {!JSX} Router component that switches which page is
 *     displayed based on the URL. Defaults to home page.
 */
export function Router() {
  return (
    <Switch>
      <Route path="/about">
        <AboutScreen/>
      </Route>
      <Route path="/product/:id">
        <ProductScreen/>
      </Route>
      <Route path="/checkout">
        <CheckoutScreen/>
      </Route>
      <Route path="/cart">
        <CartScreen/>
      </Route>
      <Route path="/thanks">
        <ThankScreen/>
      </Route>
      <Route path="/">
        <HomeScreen/>
      </Route>
    </Switch>
  );
}
