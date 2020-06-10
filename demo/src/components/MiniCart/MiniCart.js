import {Container, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Creates a component describing a shopping Cart.
 * @param {!Object} state The site state
 * @return {!JSX} The component.
 */
const MiniCartBase = ({items}) => {
  const itemsRender = [];

  /*
   * Create the content of the cart display, with one row per item.
   */
  for (const [itemID, item] of Object.entries(items)) {
    if (item.inCart) {
      itemsRender.push(<Row key={itemID}>
        <Col>{item.name}</Col>
        <Col>{item.quantity}</Col>
        <Col>{item.cost.toFixed(2)}$</Col>
      </Row>);
    }
  }

  return (
    <Container>
      <Row key='cart-header' className="header-row">
        <Col>Name</Col>
        <Col>Quantity</Col>
        <Col>Unit Cost</Col>
      </Row>
      {itemsRender }
      <Row>
        <Col/>
        <Col className="to-right">Subtotal:</Col>
        <Col>TBD$</Col>
      </Row>
    </Container>
  );
};

MiniCartBase.propTypes = {
  items: PropTypes.object,
};

// pass in all of the state as props to cart
const mapStateToProps = (state) => state;

/*
 * Decorate the CartBase function, implicity passing in information about
 * the global site state. Also pass a setQuantity function to allow modification
 * of the quantity of items in the cart.
 */
export const MiniCart = connect(mapStateToProps, null)(MiniCartBase);

