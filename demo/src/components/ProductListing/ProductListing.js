import React from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ProductListing.css';

/**
 * Creates a display component for a single product.
 * @param {string} id
 * @param {string} title
 * @param {string} price
 * @param {string} imageSrc
 * @param {string} description
 * @return {!JSX} The component.
 */
function ProductListing({id, title, price, imageSrc, description}) {
  return (
    <Link className="product-listing" to={`product/${id}`}>
      <Image
        alt={`${title} product listing thumbnail`}
        src={imageSrc}
      />
      <h2>{title}</h2>
      <p className="font-italic product-description">{description}</p>
      <p>Price: <span className="font-weight-bold">${price}</span></p>
    </Link>
  );
}

ProductListing.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  imageSrc: PropTypes.string,
  description: PropTypes.string,
};

export {ProductListing};
