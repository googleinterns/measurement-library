import {createStore} from 'redux';
import {deepCopy} from '../utils.js';
import {initialState} from './initialState.js';
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

export const store =
    createStore(
        reducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
