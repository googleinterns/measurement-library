import React from 'react';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {addOneToCart} from '../../store/StoreHelpers.js';

/**
 * @param {!Object<string,
 *      {name:string, item:!Object, quantity:number, description:string,
 *      inCart:boolean, cost:number}>} items The items stored in the site state
 * @param {function(string, number)} addToCart A function to modify
 *      the status of an item in the global cart
 * @return {!JSX} Page component for where a user can view
 *     details about a single product.
 */
const ProductScreenBase = function({items, addToCart}) {
  const {id} = useParams();
  const currProduct = items[id];
  const buttonText = currProduct.inCart ? 'In Cart' : 'Add to Cart';

  const addOnClick = () => {
    addToCart(id);
  };
  const buyOnClick = () => {
    if (!currProduct.inCart) {
      addToCart(id);
    }
  };

  return (
    <Container>
      <Row>
        <Col/>
        <Col xs={5}>
          <div>
            <Image src={currProduct.image} width="100%"/>
            <Container>
              <Row>
                <Col>
                    Name: {currProduct.name}
                </Col>
                <Col xs="8"/>
                <Col>
                    Price: ${currProduct.cost}
                </Col>
              </Row>
            </Container>
            <br/>
            <p>
              {currProduct.description}
            </p>
            <Container>
              <Row>
                <Col>
                  <Button onClick={addOnClick} disabled = {currProduct.inCart}>
                    {buttonText}
                  </Button>
                </Col>
                <Col xs="3"/>
                <Col>
                  <Button variant="success" onClick={buyOnClick}
                    as={Link} to='/cart'>Buy Now</Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
        <Col/>
      </Row>
    </Container>
  );
};

ProductScreenBase.propTypes = {
  items: PropTypes.object,
  addToCart: PropTypes.func,
};

/**
  * @param {{items:Itemstore}} state
  * @return {{items:!Object<string,
  *      {name:string, item:!Object, quantity:number, description:string,
  *      inCart:boolean, cost:number}>}} The items stored in the site state.
  */
const mapStateToProps = (state) => ({
  items: state.items,
});

/**
  * @param {Dispatch} dispatch
  * @return {function(id:{number})} The function that is to be used
  *  to update the redux store.
  */
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addOneToCart(id));
    },
  };
};

/*
 * Decorate the ProductScreenBase function, implicity passing in
 * information about the global site state. Also pass mapDispatchToProps
 * function to allow modification of global cart.
 */
export const ProductScreen =
  connect(mapStateToProps, mapDispatchToProps)(ProductScreenBase);
