import React from 'react';
import {connect} from 'react-redux';
import {Container, Col, Row, Image, Form} from 'react-bootstrap';
import './Cart.css';
import {setQuantity} from '../../store/StoreHelpers.js';
import PropTypes from 'prop-types';

/**
 * Computes the price of purchasing the given quantity
 * of all items in the cart.
 * @param {ItemStore} items A {@link ItemStore} listing of items
 * to purchase and their desired quantity.
 * @return {number} The total price.
 */
export const computePrice = (items) => {
  let totalPrice = 0;
  for (const item of Object.values(items)) {
    totalPrice += item.quantity * item.cost;
  }
  return totalPrice;
};


/**
 * Creates a component describing a shopping Cart.
 * @param {ItemStore} items The global {@link ItemStore} site object.
 * @param {function(string, number)} setQuantity A function to modify
 *      the quantity of an item in the global state.
 * @return {!JSX} The component.
 */
const CartBase = function({items, setQuantity}) {
  const /** Array<!JSX> */ itemsRender = [];

  // Create the content of the cart display, with one row per item.
  for (const [itemID, item] of Object.entries(items)) {
    if (item.inCart) {
      itemsRender.push(<Row key={itemID} className='item-row'>
        <Col xs={12} md={4}>
          <Image fluid className='image-holder' src={item.thumbnail}/>
        </Col>
        <Col><h3>{item.name}</h3><p>{item.description}</p>
          <Row>
            <Col xs={12} md={9}>
              {/** Don't refresh the page when the enter key is pressed. */}
              <Form onSubmit={(e)=>e.preventDefault()}>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type='number' value={item.quantity}
                    onChange={(event) => {
                      setQuantity(itemID, Number(event.target.value));
                    }}/>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={0} md={3}/>
          </Row>
        </Col>
        {/* Display the cost in USD, starting with a $ symbol. */}
        <Col xs={2} className='price-col'>${item.cost.toFixed(2)}</Col>
      </Row>);
    }
  }

  return (
    <Container className='cartContainer'>
      <Row key='cart-header' className='header-row'>
        <Col xs={4}/>
        <Col xs={6}/>
        <Col xs={2}>Price</Col>
      </Row>
      {itemsRender}
      <Row className='final-row'>
        <Col xs={4}/>
        <Col xs={6} className='to-right'>Subtotal:</Col>
        <Col xs={2}>{computePrice(items).toFixed(2)}$</Col>
      </Row>
    </Container>
  );
};

CartBase.propTypes = {
  items: PropTypes.object,
  setQuantity: PropTypes.func,
};

// Pass in all of the state as props to cart.
const mapStateToProps = (state) => state;

/*
 * Decorate the CartBase function, implicity passing in information about
 * the global site state. Also pass a setQuantity function to allow modification
 * of the quantity of items in the cart.
 */
export const Cart = connect(mapStateToProps, {setQuantity})(CartBase);
