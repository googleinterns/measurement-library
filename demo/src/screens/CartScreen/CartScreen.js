import React from 'react';
import {Cart} from '../../components/Cart/Cart';
import Container from 'react-bootstrap/Container';
import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './CartScreen.css';

/**
 * @return {!JSX} Page component for where a user can review
 *     the products in their shopping Cart.
 */
export function CartScreen() {
  return (
      <Container>
        <Row key="cartRow">
          <Cart/>
        </Row>
        <Row key="checkoutRow">
          <Col/>
          <Col xs = {3}>
            <Link to="/checkout" className="button-link">
              Continue to checkout</Link>
          </Col>
        </Row>
      </Container>
  );
}
