import React, {useEffect} from 'react';
import {Cart} from '../../components/Cart/Cart';
import {Container, Row} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './CartScreen.css';
import '../NavButton.css';
import {sendViewCartEvent} from '../../lib/gtagEvents';

/**
 * Page component for where a user can review
 *     the products in their shopping cart.
 * @return {!JSX} The JSX for the page
 */
export function CartScreen() {
  const /** !Object */ history = useHistory();

  // Send a view cart event whenever this page opens the first time
  // this page opens.
  useEffect(sendViewCartEvent, []);

  /**
   * Proceed to the checkout screen, sending the
   * relevant gtag event.
   */
  function proceedToCheckout() {
    history.push('/checkout');
  }

  return (
    <Container>
      <Row key='cartRow'>
        <Cart/>
      </Row>
      <Row key='checkoutRow'>
        <div className='button-like' onClick={proceedToCheckout}>
          {'Continue to checkout '}
        </div>
      </Row>
    </Container>
  );
}

