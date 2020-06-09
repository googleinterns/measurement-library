import { createStore } from 'redux'
import kitImage from './images/lookup.jpg';

export function addOneToCart(id){
  return {
    type: "INCREMENT",
    id: id,
  }
}

export function removeOneToCart(id){
  return {
    type: "DECREMENT",
    id: id,
  }
}

/**
 * Helper function to set the number of a specific item in the cart
 */
export function setQuantity(id, amount){
  return {
    type: "SET",
      id: id,
      amount: amount,
  }
}
/**
 * Functions to update the value saved in the store.
 * @param {{string:{quantity:number, ...args }}} state
 * @param {{type:string, id:string, amount:?string}} action
 */
function reducer(state = [], action) {
  const newState = JSON.parse(JSON.stringify(state));
  let id = action.id;
  switch (action.type) {
    case 'INCREMENT':
      newState.items[id].quantity++;
    break;
    case 'DECREMENT':
      newState.items[id].quantity--;
      console.error("Setting quantity to a negative amount!")
      break;
    case 'SET':
      if(action.amount < 0){
        action.amount = 0;
        console.error("Setting quantity to a negative amount!")
      }
      newState.items[id].quantity = action.amount;
      break;
    default:
  }
  return newState;
}

const items = {
  items: {'1jef2': {name: 'Kit', image: kitImage,
            description: 'a kitten', cost: 55, quantity: 2},
          'fef33': {name: 'Cat', image: kitImage, description: 'a cat',
            cost: 49.99, quantity: 1},
          'n4if8': {name: 'Cat3', image: kitImage, description: 'a cat, again?',
            cost: 99.99, quantity: 1}
  }
};

export const store = createStore(reducer, items)

