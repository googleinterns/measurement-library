import React from 'react';
import {connect} from 'react-redux';
import {Container, Col, Row, Image, Form} from 'react-bootstrap';
import './Cart.css';
import {setQuantity} from '../../store/StoreHelpers.js';
import PropTypes from 'prop-types';
import {CodeModal} from '../CodeModal/CodeModal';

/**
 * Creates a component describing a shopping Cart.
 * @param {!Object<string,
 *      {name:string, item:!Object, quantity:number, description:string,
 *      inCart:boolean, cost:number}>} items The items stored in the site state
 * @param {function(string, number)} setQuantity A function to modify
 *      the quantity of an item in the global state
 * @return {!JSX} The component.
 */
const CartBase = function({items, setQuantity}) {
  const /** Array<!JSX> */ itemsRender = [];

  // Create the content of the cart display, with one row per item.
  for (const [itemID, item] of Object.entries(items)) {
    if (item.inCart) {
      itemsRender.push(<Row key={itemID}>
        <Col><Image className='image-holder' src={item.image}/></Col>
        <Col><h3>{item.name}</h3><p>{item.description}</p>
          <Form>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" value={item.quantity}
                onChange={(event) => {
                  setQuantity(itemID, Number(event.target.value));
                }}/>
            </Form.Group>
          </Form>
        </Col>
        {/* Display the cost in USD, starting with a $ symbol */}
        <Col>${item.cost.toFixed(2)}</Col>
      </Row>);
    }
  }

  return (
    <Container>
      <CodeModal gtagCode={`gtag('title', 'cat');`}/>
      <Row key='cart-header' className="header-row">
        <Col/>
        <Col/>
        <Col>Unit Cost</Col>
      </Row>
      {itemsRender}
      <Row>
        <Col/>
        <Col className="to-right">Subtotal:</Col>
        <Col>$TBD</Col>
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
