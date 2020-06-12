import {Container, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {computePrice} from '../Cart/Cart';
import '../Cart/Cart.css';

/**
 * Creates a component describing a shopping Cart.
 * @param {!Object<string,
 *      {name:string, item:!Object, quantity:number, description:string,
 *      inCart:boolean, cost:number}>} items The items stored in the site state.
 * @param {function(string, number)} setQuantity A function to modify
 *      the quantity of an item in the global state.
 * @return {!JSX} The component.
 */
const MiniCartBase = ({items}) => {
  const /** Array<!JSX> */ itemsRender = [];

  // Create the content of the cart display, with one row per item.
  for (const [itemID, item] of Object.entries(items)) {
    if (item.inCart) {
      itemsRender.push(<Row key={itemID} className="item-row">
        <Col xs={5}>{item.name}</Col>
        <Col>{item.quantity}</Col>
        <Col xs={4}>${item.cost.toFixed(2)}</Col>
      </Row>);
    }
  }

  return (
    <Container className="cartContainer mini">
      <Row key='cart-header' className="header-row">
        <Col xs={5}>Name</Col>
        <Col>Count</Col>
        <Col xs={4}>Price</Col>
      </Row>
      {itemsRender}
      <Row className="final-row">
        <Col xs={5}/>
        <Col>Subtotal:</Col>
        <Col xs={4}>${computePrice(items).toFixed(2)}</Col>
      </Row>
    </Container>
  );
};

MiniCartBase.propTypes = {
  items: PropTypes.object,
};

// Pass in all of the state as props to cart.
const mapStateToProps = (state) => state;

/*
 * Decorate the CartBase function, implicity passing in information about
 * the global site state. Also pass a setQuantity function to allow modification
 * of the quantity of items in the cart.
 */
export const MiniCart = connect(mapStateToProps, null)(MiniCartBase);

