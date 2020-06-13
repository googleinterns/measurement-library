import React, {useMemo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Product} from '../../../components/Product/Product.js';
import './HomeProducts.css';

/**
 * Creates a display component for all the product listings on the home page.
 * @param {!Object<string, {name: string, cost: number, thumbnail: string,
 *     description: string}>} items The items stored in the site state
 * @return {!JSX} The component.
 */
const HomeProductsBase = function({items}) {
  const /** Array<!JSX> */ productListings = useMemo(() => {
    const products = [];
    for (const [itemID, item] of Object.entries(items)) {
      products.push(
          <li className="product-listing" key={itemID}>
            <Product
              id={itemID}
              title={item.name}
              price={item.cost}
              imageSrc={item.thumbnail}
              description={item.description}
            />
          </li>,
      );
    }
    return products;
  }, [items]);

  return (
    <ul className="product-list">
      {productListings}
    </ul>
  );
};

HomeProductsBase.propTypes = {
  items: PropTypes.object,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export const HomeProducts = connect(mapStateToProps)(HomeProductsBase);
