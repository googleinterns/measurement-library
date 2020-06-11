/**
 * @fileoverview Helper functions to modify the store
 */

/**
 * Adds an item from the cart and set the inCart flag to true.
 * @param {string} id The id of the item to update.
 * @return {{type:string, id:string}} Object describing the operation.
 */
export function addOneToCart(id) {
  return {
    type: 'INCREMENT',
    id: id,
  };
}

/**
 * Remove an item from the cart. If the quantity is
 * set to zero, the inCart flag is automatically set to false.
 * @param {string} id The id of the item to update.
 * @return {{id: string, type: string}} Object describing the operation.
 */
export function removeOneFromCart(id) {
  return {
    type: 'DECREMENT',
    id: id,
  };
}

/**
 * Set the number of a specified item in the cart to a specified value. Does
 * not change the inCart flag.
 * @param {string} id The id of the item to update.
 * @param {number} amount The amount of items the user wants to buy.
 * @return {{amount: number, id: string, type: string}} Object describing the
 * operation.
 */
export function setQuantity(id, amount) {
  return {
    type: 'SET',
    id: id,
    amount: amount,
  };
}
