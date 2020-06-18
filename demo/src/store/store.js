import {createStore} from 'redux';
import {deepCopy} from '../utils.js';
import {initialState} from './initialState.js';

/**
 * Modifies the state of the store according to a description of the
 * changes to make given in the action parameter.
 * @param {{items:ItemStore}} state The state to take in initially.
 * @param {{type:string, id:string, amount:?number}} action A description of
 *    the action to take.
 * @return {!Object} The new state.
 */
function reducer(state = {}, action) {
  // Deep copy state so as not to mutate anything.
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
        // Set quantity to 0 as negatives make no sense.
        item.quantity = 0;
      }
      if (item.quantity === 0) {
        item.inCart = false;
      }
      break;
    case 'SET':
      if (action.amount < 0) {
        // Set quantity to 0 as negatives make no sense.
        action.amount = 0;
      }
      item.quantity = action.amount;
      break;
    default:
  }
  return newState;
}

/**
 * Save a state to localStorage.
 * @param {{items:ItemStore}} store The new state.
 */
const saveState = (store) => {
  try {
    const updatedStore = JSON.stringify(store);
    localStorage.setItem('state', updatedStore);
  } catch (err) {
    // For some reason we can't save, just log an error message.
    console.error('There was an error saving the state:\n' + err);
  }
};

/**
 * Load the current state from memory, or return a default state object.
 * @return {{items:ItemStore}} The saved state.
 */
export const loadState = () => {
  let currentState;
  try {
    currentState = localStorage.getItem('state');
  } catch (err) {
    // We are not allowed access the local storage.
    console.error('There was an error loading the state:');
    console.error(err);
    return initialState;
  }
  if (!currentState) { // There is nothing in the local storage.
    return initialState;
  }
  try {
    return JSON.parse(currentState);
  } catch (err) {
    console.error('The stored state was invalid!');
    console.error(err);
    return initialState;
  }
};

export const store = createStore(reducer, loadState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());

// Automatically save the state after any change.
store.subscribe(()=>saveState(store.getState()));
