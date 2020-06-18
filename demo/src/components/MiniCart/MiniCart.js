import {Container, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {computePriceOfItemsInCart} from '../../utils.js';
import '../Cart/Cart.css';

/**
 * Creates a component describing a shopping cart.
 * @param {ItemStore} items The global {@link ItemStore} site object.
 * @return {!JSX} The component.
 */
const MiniCartBase = ({items}) => {
  const /** Array<!JSX> */ itemsRender = [];

  // Create the content of the cart display, with one row per item.
  for (const [itemID, item] of Object.entries(items)) {
    if (item.inCart) {
      itemsRender.push(<Row key={itemID} className='item-row'>
        <Col xs={5}>{item.name}</Col>
        <Col>{item.quantity}</Col>
        <Col xs={4}>${item.cost.toFixed(2)}</Col>
      </Row>);
    }
  }

  return (
    <Container className='cart-container mini'>
      <Row key='cart-header' className='header-row'>
        <Col xs={5}>Name</Col>
        <Col>Count</Col>
        <Col xs={4}>Price</Col>
      </Row>
      {itemsRender}
      <Row className='final-row'>
        <Col xs={5}/>
        <Col>Subtotal:</Col>
        <Col xs={4}>${computePriceOfItemsInCart().toFixed(2)}</Col>
      </Row>
    </Container>
  );
};

MiniCartBase.propTypes = {
  items: PropTypes.object,
};

// Pass in all of the state as props.
const mapStateToProps = (state) => state;

/*
 * Decorate the MiniCartBase function, implicity passing in information about
 * the global site state.
 */
export const MiniCart = connect(mapStateToProps, null)(MiniCartBase);

