import React from 'react';
import {connect} from 'react-redux';
import {Container, Col, Row, Image, Form} from 'react-bootstrap';
import './Cart.css';
import {setQuantity, removeOneFromCart} from '../../store/StoreHelpers.js';
import PropTypes from 'prop-types';
import {CodeModal} from '../CodeModal/CodeModal';
import {FiTrash2} from 'react-icons/fi';

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
 * @param {function(string)} removeOneFromCart A function to reduce the
 * quantity of an element in the cart by 1, deleting it if the quantity is
 * empty.
 * @return {!JSX} The component.
 */
const CartBase = function({items, setQuantity, removeOneFromCart}) {
  const /** Array<!JSX> */ itemsRender = [];

  // Create the content of the cart display, with one row per item.
  for (const [itemID, item] of Object.entries(items)) {
    if (item.inCart) {
      itemsRender.push(<Row key={itemID} className='item-row'>
        <Col xs={12} md={4}>
          <Image fluid className='image-holder' src={item.image}/>
        </Col>
        <Col><h3>{item.name}</h3><p>{item.description}</p>
          <Row>
            <Col xs={9}>
              <Form>
                <Form.Group>
                  <Form.Label>{'Quantity'}</Form.Label>
                  <Form.Control type='number' value={item.quantity}
                    onChange={(event) => {
                      setQuantity(itemID, Number(event.target.value));
                    }}/>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} className="remove-from-cart-icons">
              <FiTrash2 size={16} onClick={()=>removeOneFromCart(itemID)}/>
              {' '}
              <CodeModal popupId={'set' + itemID}
                gtagCode={`gtag('event', \n ... \n)`}
                ourCode={`tag('event', \n remove... \n)`}/>
            </Col>
          </Row>
        </Col>
        {/* Display the cost in USD, starting with a $ symbol */}
        <Col xs={2} className='price-col'>${item.cost.toFixed(2)}</Col>
      </Row>);
    }
  }

  return (
    <Container className='cart-container'>
      <Row key='cart-header' className='header-row'>
        <Col xs={4}/>
        <Col xs={6}/>
        <Col xs={2}>Price</Col>
      </Row>
      {itemsRender}
      <Row className='final-row'>
        <Col xs={4}/>
        <Col xs={6} className='to-right'>Subtotal:</Col>
        <Col xs={2}>${computePrice(items).toFixed(2)}</Col>
      </Row>
    </Container>
  );
};

CartBase.propTypes = {
  items: PropTypes.object,
  setQuantity: PropTypes.func,
  removeOneFromCart: PropTypes.func,
};

// Pass in all of the state as props to cart.
const mapStateToProps = (state) => state;

/*
 * Decorate the CartBase function, implicity passing in information about
 * the global site state. Also pass a setQuantity function to allow modification
 * of the quantity of items in the cart.
 */
export const Cart = connect(mapStateToProps,
    {setQuantity, removeOneFromCart})(CartBase);
