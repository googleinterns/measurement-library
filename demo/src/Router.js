import React, {useEffect} from 'react';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AboutScreen} from './screens/AboutScreen/AboutScreen.js';
import {CartScreen} from './screens/CartScreen/CartScreen.js';
import {CheckoutScreen} from './screens/CheckoutScreen/CheckoutScreen.js';
import {HomeScreen} from './screens/HomeScreen/HomeScreen.js';
import {ProductScreen} from './screens/ProductScreen/ProductScreen.js';
import {ThankScreen} from './screens/ThankScreen/ThankScreen.js';
import {pageview} from './lib/gtag.js';

/**
 * Creates component that switches which page is displayed based on the URL.
 * Defaults to home page. Sends page_view event to Google Analytics.
 * @return {!JSX}
 */
function RouterBase({history}) {
  // Sends the first page view and subscribes to future page changes
  useEffect(() => {
    sendPageView(history.location);
    history.listen(sendPageView);
  }, [history]);

  const sendPageView = (location) => {
    pageview(location.pathname);
  };

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

RouterBase.propTypes = {
  history: PropTypes.object,
};

export const Router = withRouter(RouterBase);
