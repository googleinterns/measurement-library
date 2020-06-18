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
 * Creates a code snippet for a gtag event.
 * @param {string} event
 * @param {!Object<string, *>} parameters
 * @return {string} Code snippet of the event.
 */
export const getEventCodeSnippet = (event, parameters) => {
  return `gtag("event", "${event}", ` +
      `${JSON.stringify(parameters, undefined, 2)})`;
};

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
    ...(quantity > 0 && {quantity}),
  };
}

/**
 * Collects all the standard item parameters from the items in the cart
 * and returns them in an array.
 * @return {Array<!ItemParameters>}
 */
export function getItemsArrayFromCart() {
  const /** Array<!ItemParameters> */ itemsArray = [];
  const /** {ItemStore} */ items = store.getState().items;
  for (const [itemID, item] of Object.entries(items)) {
    if (item.inCart) {
      itemsArray.push({
        ...getItemParameters(itemID),
      });
    }
  }
  return itemsArray;
}
