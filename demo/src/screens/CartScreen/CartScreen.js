import React, {useEffect} from 'react';
import {Cart} from '../../components/Cart/Cart';
import {Container, Row, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {sendViewCartEvent} from '../../lib/events.js';
import './CartScreen.css';
import '../NavButton.css';

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

  return (
    <Container>
      <Row key='cartRow'>
        <Cart/>
      </Row>
      <Row key='checkoutRow' className='checkout-row'>
        <Button variant="secondary" onClick={()=>history.push('/checkout')}>
          {'Checkout'}
        </Button>
      </Row>
    </Container>
  );
}
