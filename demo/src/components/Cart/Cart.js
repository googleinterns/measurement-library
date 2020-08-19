import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Col, Row, Image, Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {FiTrash2} from 'react-icons/fi';
import {setQuantity, removeOneFromCart} from '../../store/StoreHelpers.js';
import {CodeModal} from '../CodeModal/CodeModal.js';
import {computePriceOfItemsInCart} from '../../utils.js';
import {getRemoveFromCartCodeSnippet, getViewCartCodeSnippet} from '../../lib/snippets.js';
import {sendRemoveFromCartEvent} from '../../lib/events.js';
import './Cart.css';
import '../CodeModal/CodeModal.css';

/**
 * Creates a component describing a shopping Cart.
 * @param {ItemStore} items The global {@link ItemStore} site object.
 * @param {function(string, number)} setQuantity A function to modify
 *     the quantity of an item in the global state.
 * @param {function(string)} removeOneFromCart A function to reduce the
 *     quantity of an element in the cart by 1, deleting it if the quantity is
 *     empty.
 * @return {!JSX} The component.
 */
const CartBase = ({items, setQuantity, removeOneFromCart}) => {
  const /** Array<!JSX> */ itemsRender = [];

  // Create the content of the cart display, with one row per item.
  for (const [itemID, item] of Object.entries(items)) {
    if (item.inCart) {
      itemsRender.push(<Row key={itemID} className='item-row'>
        <Col xs={12} md={4} lg={3} className="to-center">
          <Link to={`/product/${itemID}`}>
            <Image fluid className='image-holder' src={item.thumbnail}/>
          </Link>
        </Col>
        <Col>
          <Link className="product-title" to={`/product/${itemID}`}>
            <h2>{item.name}</h2>
          </Link>
          <p>{item.description}</p>
          <Row>
            <Col xs={3} lg={2}>
              {/** Don't refresh the page when the enter key is pressed. */}
              <Form onSubmit={(e)=>e.preventDefault()}>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  {/** Making item.quantity a string removes leading zeros. */}
                  <Form.Control type='number' value={item.quantity.toString()}
                    onChange={(event) => {
                      setQuantity(itemID, Number(event.target.value));
                    }}/>
                </Form.Group>
              </Form>
            </Col>
            <Col className="remove-from-cart-icons">
              <Button variant="link">
                <FiTrash2 size={16} onClick={()=>{
                  sendRemoveFromCartEvent(itemID);
                  removeOneFromCart(itemID);
                }}/>
              </Button>
              <CodeModal popupId={'set' + itemID}
                gtagCode={getRemoveFromCartCodeSnippet(itemID)}
                measureCode={getRemoveFromCartCodeSnippet(itemID, 'measure')}/>
            </Col>
          </Row>
        </Col>
        {/* Display the cost in USD, starting with a $ symbol. */}
        <Col xs={2} className='price-col'>${item.cost.toFixed(2)}</Col>
      </Row>);
    }
  }

  return (
    <Container className='cart-container'>
      <Row key='cart-header' className='header-row'>
        <Col xs={10} className='header-with-modal'>
          <h2>Items In Cart</h2>
          <CodeModal popupId={'view_cart'}
            gtagCode={getViewCartCodeSnippet()}
            measureCode={getViewCartCodeSnippet('measure')}/>
        </Col>
        <Col xs={2}>Price</Col>
      </Row>
      {itemsRender}
      <Row className='final-row'>
        <Col xs={6}/>
        <Col xs={4} className='to-right'>Subtotal:</Col>
        <Col xs={2}>${computePriceOfItemsInCart().toFixed(2)}</Col>
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
