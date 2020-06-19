import React from 'react';
import {Cart} from '../../components/Cart/Cart';
import {Container, Row} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './CartScreen.css';
import '../NavButton.css';
import {CodeModal} from '../../components/CodeModal/CodeModal';
import {getBeginCheckoutCodeSnippet} from '../../lib/gtagSnippets.js';
import {sendBeginCheckoutEvent} from '../../lib/gtagEvents';
import {getMeasureCodeSnippet} from '../../utils';

/**
 * Page component for where a user can review
 *     the products in their shopping cart.
 * @return {!JSX} The JSX for the page
 */
export function CartScreen() {
  const /** !Object */ history = useHistory();

  /**
   * Proceed to the checkout screen, sending the
   * relevant gtag event.
   */
  function proceedToCheckout() {
    sendBeginCheckoutEvent();
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
          <CodeModal popupId={'begin_checkout'}
            gtagCode={getBeginCheckoutCodeSnippet()}
            ourCode={getMeasureCodeSnippet()}/>
        </div>
      </Row>
    </Container>
  );
}

