import React from 'react';
import { connect } from 'react-redux'
import {Container, Col, Row, Form} from 'react-bootstrap';
import './Cart.css';
import {setQuantity} from '../../store';
import Image from 'react-bootstrap/Image';

/**
 * Creates a component describing a shopping Cart.
 * @return {!JSX} The component.
 */
let CartBase = function Cart({items, setQuantity}) {
  const itemsRender = [];

  /*
   * Create the content of the cart display, with one row per item.
   */
  for (const [itemID, item] of Object.entries(items)) {
    if(item.inCart) {
      itemsRender.push(<Row key={itemID}>
        <Col><Image className='image-holder' src={item.image}/></Col>
        <Col><h3>{item.name}</h3><p>{item.description}</p>
          <Form>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" value={item.quantity}
                            onChange={(event) => {
                              setQuantity(itemID, +event.target.value)
                            }}/>
            </Form.Group>
          </Form>
        </Col>
        <Col>{item.cost.toFixed(2)}$</Col>
      </Row>);
    }
  }

  return (
      <Container>
        <Row key='cart-header' className="header-row">
          <Col/>
          <Col/>
          <Col>Unit Cost</Col>
        </Row>
        {itemsRender }
        <Row>
          <Col/>
          <Col className="to-right">Subtotal: TBD$</Col>
        </Row>
      </Container>
  );
}

// pass in all of the state as props to cart
const mapStateToProps = state => state;

/*
 * Decorate the CartBase function, implicity passing in information about
 * the global site state. Also pass a setQuantity function to allow modification
 * of the quantity of items in the cart.
 */
export const Cart = connect(mapStateToProps, {setQuantity})(CartBase)
