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
  items: {
    '1jef2': {name: 'Airplane Ears', image: airplane_ears,
      cost: 55, quantity: 1,
      description: 'He wants to fly away with your heart', },
    'fef33': {name: 'Big Yawn', image: big_yawn, cost: 49.99, quantity: 0,
      description: "A cuddy yawning cat"},
    'n4if8': {name: 'Fluffy', image: fluffy, cost: 99.99, quantity: 0,
      description: 'A whole lot of floof'},
    'dsm44': {name: 'Makin Bisuits', image: makin_biscuits,
      cost: 100.00, quantity: 1,
      description: 'Yet another picture of Poe',},
    '3nv89': {name: 'Paws Up', image: paws_up, cost: 100.00, quantity: 1,
      description: 'This cat has it\'s paws where you can see them',},
    'mv1dd': {name: 'Pet my belly', image: pet_my_belly,
      cost:30.00, quantity: 0,
      description: 'He demands snuggles',},
    '45h84': {name: 'Phone Background', image: phone_background,
      cost: 30.00, quantity: 0,
      description: 'Legend has it that some developer had this image as their' +
          'phone background for an entire year',},
    '3h488': {name: 'Snoozing', image: snoozing, cost:30.00, quantity: 0,
      description: 'Cats don\'t have to get up in the morning',},
    'ksd7d': {name: 'Spoiled', image: spoiled, cost:30.00, quantity: 0,
      description: 'All the toys in the world and a nice bed to boot',},
    'hjdf7': {name: 'What you lookin at?', image: what_you_lookin_at,
      cost:30.00, quantity: 0,
      description: 'Move along, nothing to see here',},
}
};

export const store = createStore(reducer, items)

