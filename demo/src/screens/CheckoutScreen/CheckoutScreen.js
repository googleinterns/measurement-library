import React from 'react';
import {MiniCart} from '../../components/MiniCart/MiniCart.js';

/**
 * @return {!JSX} Page component for where a user can purchase
 *     the items they've selected.
 */
export function CheckoutScreen() {
  return (
    <div>
      <MiniCart/>
    </div>
  );
}
