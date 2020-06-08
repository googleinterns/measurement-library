import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import {CartScreen} from './screens/CartScreen/CartScreen';
import {HomeScreen} from './screens/HomeScreen/HomeScreen';

/**
 * Component to wrap the rest of the website with common components.
 * @return {!JSX} Returns site presentation for header, navigation,
 *     and shopping cart.
 */
export function Router() {
  return (
    <Switch>
      <Route path="/cart">
        <CartScreen/>
      </Route>
      <Route path="/">
        <HomeScreen/>
      </Route>
    </Switch>
  );
}
