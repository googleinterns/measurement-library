import React from 'react';
import {Cart} from '../../components/Cart/Cart';
import {Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './CartScreen.css';
import '../NavButton.css';
import {CodeModal} from '../../components/CodeModal/CodeModal';

/**
 * Page component for where a user can review
 *     the products in their shopping cart.
 * @return {!JSX} The JSX for the page
 */
export function CartScreen() {
  return (
    <Container>
      <Row key='cartRow'>
        <Cart/>
      </Row>
      <Row key='checkoutRow'>
        <div className='button-like'>
          <Link to='/checkout' className='plain-text'>
              Continue to checkout
          </Link>{' '}
          <CodeModal popupId={'begin_checkout'}
            gtagCode={`gtag('event', \n ... \n)`}
            ourCode={`tag('event', \n begin_checkout... \n)`}/>
        </div>
      </Row>
    </Container>
  );
}

