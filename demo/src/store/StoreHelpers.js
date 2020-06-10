/**
 * Helper functions to modify the store
 */

/**
 * Helper function to add an item from the cart and set the inCart
 * flag to true.
 * @param {string} id: the id of the item to update
 * @return {{type:string, id:string}} object describing the operation
 */
export function addOneToCart(id) {
  return {
    type: 'INCREMENT',
    id: id,
  };
}

/**
 * Helper function to remove an item from the cart. If the quantity is
 * set to zero, the inCart flag is automatically set to false.
 * @param {string} id: the id of the item to update
 * @return {{id: string, type: string}} object describing the operation
 */
export function removeOneFromCart(id) {
  return {
    type: 'DECREMENT',
    id: id,
  };
}

/**
 * Helper function to set the number of a specific item in the cart. Does
 * not change the inCart flag.
 * @param {string} id: the id of the item to update
 * @param {number} amount: the amount of items the user wants to buy
 * @return {{amount: number, id: string, type: string}} Object describing the
 * operation
 */
export function setQuantity(id, amount) {
  return {
    type: 'SET',
    id: id,
    amount: amount,
  };
}
