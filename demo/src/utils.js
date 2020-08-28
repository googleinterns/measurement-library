/**
 * @fileoverview Utility functions for the demo app.
 *
 */
import {store} from './store/store.js';

/**
 * Create a deep copy of the passed in data, which is expected
 * to be shaped like the sample data in store.js.
 * @param {!Object} data The data to copy.
 * @return {!Object} A deep copy of the input.
 */
export function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

/**
 * Creates a code snippet for an event.
 * @param {string} event
 * @param {!Object<string, *>} parameters
 * @param {string=} library
 * @return {string} Code snippet of the event.
 */
export function getEventCodeSnippet(event, parameters, library = 'gtag') {
  if (library === 'measure' && !parameters.page_title) {
    parameters.page_title = 'Prints of Poe';
  }
  return `${library}("event", "${event}", ` +
      `${JSON.stringify(parameters, undefined, 2)})`;
}

/**
 * Computes the price of purchasing the given quantity
 * of all items in the cart.
 * @return {number} The total price.
 */
export function computePriceOfItemsInCart() {
  const /** {ItemStore} */ items = store.getState().items;
  let totalPrice = 0;
  for (const item of Object.values(items)) {
    totalPrice += item.quantity * item.cost;
  }
  return totalPrice;
}

/**
 * Type definition for our application's standard item parameters.
 * These are to be sent in the items array found in many gtag events.
 * Acceptable parameters can be [found here](https://developers.google.com/gtagjs/reference/aw-events)
 * @typedef {{item_id: string, item_name: string,
 *     price: string}} ItemParameters
 */

/**
 * Selects an item from the store via ID and returns an object containing
 * its standard item parameters.
 * @param {string} itemId
 * @return {!ItemParameters}
 */
export function getItemParameters(itemId) {
  const /** {ItemStore} */ items = store.getState().items;
  const /** {number} */ quantity = items[itemId].quantity;
  return {
    item_id: itemId,
    item_name: items[itemId].name,
    price: items[itemId].cost,
    // if quantity is positive, include it in the item parameter
    ...(quantity > 0 ? {quantity} : {}),
  };
}

/**
 * Collects a single item's standard parameters and returns it as an
 * object with items attribute mapped to items array containing single item.
 * @param {string} itemId
 * @return {{items: Array<!ItemParameters>}}
 */
export function getItemsParameterFromSingleItem(itemId) {
  return {
    items: [{
      ...getItemParameters(itemId),
    }],
  };
}

/**
 * Collects all the standard item parameters from the items in the cart
 * and returns them as an object with items attribute mapped to items array.
 * @return {{items: Array<!ItemParameters>}}
 */
export function getItemsParameterFromCart() {
  const /** Array<!ItemParameters> */ itemsArray = [];
  const /** {ItemStore} */ items = store.getState().items;
  for (const [itemID, item] of Object.entries(items)) {
    if (item.inCart) {
      itemsArray.push({
        ...getItemParameters(itemID),
      });
    }
  }
  return {
    items: itemsArray,
  };
}

/**
 * Collects standard parameters for checkout related events and returns
 * them as an object with items and value attributes mapped to cart values.
 * @return {{items: Array<!ItemParameters>, value: number}}
 */
export function getItemsAndValueParametersFromCart() {
  return {
    ...getItemsParameterFromCart(),
    value: computePriceOfItemsInCart(),
  };
}
