import React from 'react';
import {MiniCart} from '../../components/MiniCart/MiniCart.js';
import {Container, Col, Row} from 'react-bootstrap';

/**
 * @return {!JSX} Page component for where a user can purchase
 *     the items they've selected.
 */
export function CheckoutScreen() {
  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
        </Col>
        <Col xs={12} md={6}>
          <MiniCart/>
        </Col>
      </Row>
    </Container>
  );
}
