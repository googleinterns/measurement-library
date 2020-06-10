import { createStore } from 'redux'
import airplane_ears from './images/airplane_ears.jpg';
import big_yawn from './images/big_yawn.jpg';
import fluffy from './images/fluffy.jpg';
import makin_biscuits from './images/makin_biscuits.jpg';
import paws_up from './images/paws_up.jpg';
import pet_my_belly from './images/pet_my_belly.jpg';
import phone_background from './images/phone_background.jpg';
import snoozing from './images/snoozing.jpg';
import spoiled from './images/spoiled.jpg';
import what_you_lookin_at from './images/what_you_lookin_at.jpg';

/**
 * Helper function to add an item from the cart and set the inCart
 * flag to true.
 * @param {string} id: the id of the item to update
 */
export function addOneToCart(id){
  return {
    type: "INCREMENT",
    id: id,
  }
}

/**
 * Helper function to remove an item from the cart. If the quantity is
 * set to zero, the inCart flag is automatically set to false.
 * @param {string} id: the id of the item to update
 */
export function removeOneFromCart(id){
  return {
    type: "DECREMENT",
    id: id,
  }
}

/**
 * Helper function to set the number of a specific item in the cart. Does
 * not change the inCart flag.
 * @param {string} id: the id of the item to update
 * @param {int} amount: the amount of items the user wants to buy
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
 * @param {Object.<string,
 *         Object.<string,{quantity:number, inCart:boolean, ...args }>>} state
 * @param {{type:string, id:string, amount:?string}} action
 */
function reducer(state = [], action) {
  // deep copy state so as not to mutate anything
  const newState = JSON.parse(JSON.stringify(state));
  const item = newState.items[action.id];
  switch (action.type) {
    case 'INCREMENT':
      item.quantity++;
      item.inCart = true;
    break;
    case 'DECREMENT':
      item.quantity--;
      if(item.quantity < 0) {
        console.error("Setting quantity to a negative amount!")
        item.quantity++;
      }
      if(item.quantity === 0){
        item.inCart = false;
      }
      break;
    case 'SET':
      if(action.amount < 0){
        action.amount = 0;
        console.error("Setting quantity to a negative amount!")
      }
      item.quantity = action.amount;
      break;
    default:
  }
  return newState;
}

/**
 * Sample data for the application. Each item is stored on the site,
 * along with the quantity in the user's cart and if it is in the user's
 * cart. If the item is not in the cart, the quantity is 0, but the converse
 * is not always true, users that modify how many items are in their cart
 * will usually not want it to disappear immediately.
 */
const items = {
  items: {
    '1jef2': {name: 'Airplane Ears', image: airplane_ears,
      cost: 55, quantity: 1, inCart: true,
      description: 'He wants to fly away with your heart', },
    'fef33': {name: 'Big Yawn', image: big_yawn,
      cost: 4.99, quantity: 6, inCart: true,
      description: "A cuddy yawning cat"},
    'n4if8': {name: 'Fluffy', image: fluffy,
      cost: 99.99, quantity: 0, inCart: true,
      description: 'A whole lot of floof'},
    'dsm44': {name: 'Makin Bisuits', image: makin_biscuits,
      cost: 99.98, quantity: 0, inCart: false,
      description: 'Yet another picture of Poe',},
    '3nv89': {name: 'Paws Up', image: paws_up,
      cost: 19.49, quantity: 0, inCart: false,
      description: 'This cat has it\'s paws where you can see them',},
    'mv1dd': {name: 'Pet my belly', image: pet_my_belly,
      cost: 399.99, quantity: 0, inCart: false,
      description: 'He demands snuggles',},
    '45h84': {name: 'Phone Background', image: phone_background,
      cost: 9.99, quantity: 0, inCart: false,
      description: 'Legend has it that some developer had this image as their' +
          'phone background for an entire year',},
    '3h488': {name: 'Snoozing', image: snoozing,
      cost: 4.99, quantity: 0, inCart: false,
      description: 'Cats don\'t have to get up in the morning',},
    'ksd7d': {name: 'Spoiled', image: spoiled,
      cost: .49, quantity: 0, inCart: false,
      description: 'All the toys in the world and a nice bed to boot',},
    'hjdf7': {name: 'What you lookin at?', image: what_you_lookin_at,
      cost: .05, quantity: 0, inCart: false,
      description: 'Move along, nothing to see here',},
}
};

export const store = createStore(reducer, items)

