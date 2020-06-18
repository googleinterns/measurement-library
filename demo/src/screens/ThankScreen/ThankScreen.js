import React, {useMemo} from 'react';
import {Container, Row, Col, Jumbotron} from 'react-bootstrap';
import {ProductListing} from '../../components/ProductListing/ProductListing.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/**
 * @param {!Object} items The items stored in the site state
 * @return {!JSX} Page component where we thank the user
 *     for their purchase(s).
 */
export const ThankScreenBase = function({items}) {
  const /** Array<!JSX> */ productListings = useMemo(() => {
    const ITEMS_TO_DISPLAY = 6;
    const products = [];
    const usedItemSet = new Set();

    let i;
    for (i = 0; i < ITEMS_TO_DISPLAY; ++i) {
      let maxPrice = 0;
      let maxPriceItem;
      let maxPriceID;

      // Finds and pushes the most expensive item that has not yet been used.
      for (const [itemID, item] of Object.entries(items)) {
        if (item.cost > maxPrice && !usedItemSet.has(itemID)) {
          maxPriceItem = item;
          maxPriceID = itemID;
          maxPrice = item.cost;
        }
      }
      products.push(
          <li className="product-listing-container" key={maxPriceID}>
            <ProductListing
              id={maxPriceID}
              title={maxPriceItem.name}
              price={maxPriceItem.cost}
              imageSrc={maxPriceItem.thumbnail}
              description={maxPriceItem.description}
            />
          </li>,
      );
      usedItemSet.add(maxPriceID);
    }

    return products;
  }, [items]);

  return (
    <Container>
      <Row>
        <Col/>
        <Col xs={10}>
          <Jumbotron>
            <div style = {{paddingBottom: 50, fontSize: 30}}>
              {'Thank you for your purchase!'}
            </div>
            {'Here are some other items you may be interested in:'}
            <br/>
            <ul className="product-list">
              {productListings}
            </ul>
          </Jumbotron>
        </Col>
        <Col/>
      </Row>
    </Container>
  );
};

ThankScreenBase.propTypes = {
  items: PropTypes.object,
};

/**
  * @param {{items:Itemstore}} state
  * @return {{items:Itemstore}} The items stored in the site state.
  */
const mapStateToProps = (state) => ({
  items: state.items,
});

/*
 * Decorate the ProductScreenBase function, implicity passing in
 * information about the global site state. Also pass mapDispatchToProps
 * function to allow modification of global cart.
 */
export const ThankScreen = connect(mapStateToProps)(ThankScreenBase);
