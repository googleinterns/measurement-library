import {createStore} from 'redux';
import {deepCopy} from '../utils';
import airplaneEars from '../images/airplane_ears.jpg';
import bigYawn from '../images/big_yawn.jpg';
import fluffy from '../images/fluffy.jpg';
import makinBiscuits from '../images/makin_biscuits.jpg';
import pawsUp from '../images/paws_up.jpg';
import petMyBelly from '../images/pet_my_belly.jpg';
import phoneBackground from '../images/phone_background.jpg';
import snoozing from '../images/snoozing.jpg';
import spoiled from '../images/spoiled.jpg';
import whatYouLookinAt from '../images/what_you_lookin_at.jpg';

/**
 * Modifies the state of the store according to a description of the
 * changes to make given in the action parameter.
 * @param {!Object} state The state to take in initially.
 * @param {{type:string, id:string, amount:?number}} action a description of
 * the action to take.
 * @return {!Object} the new State
 */
function reducer(state = [], action) {
  // deep copy state so as not to mutate anything
  const newState = deepCopy(state);
  const item = newState.items[action.id];
  switch (action.type) {
    case 'INCREMENT':
      item.quantity++;
      item.inCart = true;
      break;
    case 'DECREMENT':
      item.quantity--;
      if (item.quantity < 0) {
        console.error('Setting quantity to a negative amount!');
        item.quantity++;
      }
      if (item.quantity === 0) {
        item.inCart = false;
      }
      break;
    case 'SET':
      if (action.amount < 0) {
        action.amount = 0;
        console.error('Setting quantity to a negative amount!');
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
const startingState = {
  items: {
    '1jef2': {name: 'Airplane Ears', image: airplaneEars,
      cost: 55, quantity: 1, inCart: true,
      description: 'He wants to fly away with your heart'},
    'fef33': {name: 'Big Yawn', image: bigYawn,
      cost: 4.99, quantity: 6, inCart: true,
      description: 'A cuddy yawning cat'},
    'n4if8': {name: 'Fluffy', image: fluffy,
      cost: 99.99, quantity: 0, inCart: true,
      description: 'A whole lot of floof'},
    'dsm44': {name: 'Makin Bisuits', image: makinBiscuits,
      cost: 99.98, quantity: 0, inCart: false,
      description: 'Yet another picture of Poe'},
    '3nv89': {name: 'Paws Up', image: pawsUp,
      cost: 19.49, quantity: 0, inCart: false,
      description: 'This cat has it\'s paws where you can see them'},
    'mv1dd': {name: 'Pet my belly', image: petMyBelly,
      cost: 399.99, quantity: 0, inCart: false,
      description: 'He demands snuggles'},
    '45h84': {name: 'Phone Background', image: phoneBackground,
      cost: 9.99, quantity: 0, inCart: false,
      description: 'Legend has it that some developer had this image as their' +
          'phone background for an entire year'},
    '3h488': {name: 'Snoozing', image: snoozing,
      cost: 4.99, quantity: 0, inCart: false,
      description: 'Cats don\'t have to get up in the morning'},
    'ksd7d': {name: 'Spoiled', image: spoiled,
      cost: .49, quantity: 0, inCart: false,
      description: 'All the toys in the world and a nice bed to boot'},
    'hjdf7': {name: 'What you lookin at?', image: whatYouLookinAt,
      cost: .05, quantity: 0, inCart: false,
      description: 'Move along, nothing to see here'},
  },
};

export const store = createStore(reducer, startingState);
