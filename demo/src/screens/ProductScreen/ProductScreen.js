import React from 'react';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {addOneToCart} from '../../store/StoreHelpers.js';


/**
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
                  <Button onClick={addOnClick} disabled = {currProduct.inCart}>{buttonText}</Button>
                </Col>
                <Col xs="3"/>
                <Col>
                  <Button variant="success" onClick={buyOnClick} as={Link} to='/cart'>Buy Now</Button>
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

const mapStateToProps = (state) => ({
  items: state.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addOneToCart(id));
    },
  };
};

export const ProductScreen = connect(mapStateToProps,
    mapDispatchToProps)(ProductScreenBase);
