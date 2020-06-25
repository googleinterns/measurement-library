import React from 'react';
import {Button} from 'react-bootstrap';
import ModalImage from 'react-modal-image';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {addOneToCart} from '../../store/StoreHelpers.js';
import './ProductScreen.css';

/**
 * @param {!Object<string,
 *      {name:string, item:!Object, quantity:number, description:string,
 *      inCart:boolean, cost:number}>} items The items stored in the site state
 * @param {function(string, number)} addToCart A function to modify
 *      the status of an item in the global cart
 * @return {!JSX} Page component for where a user can view
 *     details about a single product.
 */
const ProductScreenBase = ({items, addToCart}) => {
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
    <div className="product-page">
      <div className="product-info">
        <h1>{currProduct.name}</h1>
        <ModalImage
          className="product-image"
          small={currProduct.thumbnail}
          large={currProduct.image}
        />
        <p className="font-italic">Click image to view full print.</p>
        <div className="about-product">
          <p>{'Price: '}
            <span className="font-weight-bold">${currProduct.cost}</span>
          </p>
          <p>
            {currProduct.description}
          </p>
          <div className="button-row">
            <Button
              variant="secondary"
              onClick={addOnClick}
              disabled={currProduct.inCart}
            >
              {buttonText}
            </Button>
            <Button variant="secondary" onClick={buyOnClick}
              as={Link} to='/cart'>Buy Now</Button>
          </div>
        </div>
      </div>
    </div>
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
