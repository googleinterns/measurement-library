import {v4} from 'uuid';
import {getItemParameters, getItemsArrayFromCart, computePriceOfItemsInCart, getEventCodeSnippet} from '../utils.js';

/**
 * Creates a select_item event code snippet.
 * @param {string} itemId
 * @return {string} Code snippet of the event.
 */
export function selectItem(itemId) {
  return getEventCodeSnippet('select_item', {
    items: [
      ...getItemParameters(itemId),
    ],
  });
}

/**
 * Creates a view_item event code snippet.
 * @param {string} itemId
 * @return {string} Code snippet of the event.
 */
export function viewItem(itemId) {
  return getEventCodeSnippet('view_item', {
    items: [
      ...getItemParameters(itemId),
    ],
  });
}

/**
 * Creates an add_to_cart event code snippet.
 * @param {string} itemId
 * @return {string} Code snippet of the event.
 */
export function addToCart(itemId) {
  return getEventCodeSnippet('add_to_cart', {
    items: [
      ...getItemParameters(itemId),
    ],
  });
}

/**
 * Creates a remove_from_cart event code snippet.
 * @param {string} itemId
 * @return {string} Code snippet of the event.
 */
export function removeFromCart(itemId) {
  return getEventCodeSnippet('remove_from_cart', {
    items: [
      ...getItemParameters(itemId),
    ],
  });
}

/**
 * Creates a view_cart event code snippet.
 * @return {string} Code snippet of the event.
 */
export function viewCart() {
  return getEventCodeSnippet('view_cart', {
    value: computePriceOfItemsInCart(),
    currency: 'USD',
    items: getItemsArrayFromCart(),
  });
}

/**
 * Creates a begin_checkout event code snippet.
 * @return {string} Code snippet of the event.
 */
export function beginCheckout() {
  return getEventCodeSnippet('begin_checkout', {
    value: computePriceOfItemsInCart(),
    currency: 'USD',
    items: getItemsArrayFromCart(),
  });
}

/**
 * Creates an add_payment_info event code snippet.
 * @return {string} Code snippet of the event.
 */
export function addPaymentInfo() {
  return getEventCodeSnippet('add_payment_info', {
    value: computePriceOfItemsInCart(),
    payment_type: 'google_pay',
    currency: 'USD',
    items: getItemsArrayFromCart(),
  });
}

/**
 * Creates an add_shipping_info event code snippet.
 * @return {string} Code snippet of the event.
 */
export function addShippingInfo() {
  return getEventCodeSnippet('add_shipping_info', {
    value: computePriceOfItemsInCart(),
    currency: 'USD',
    coupon: 'Free Shipping',
    shipping_tier: 'Ground',
    items: getItemsArrayFromCart(),
  });
}

/**
 * Creates a purchase event code snippet.
 * @return {string} Code snippet of the event.
 */
export function purchase() {
  return getEventCodeSnippet('purchase', {
    value: computePriceOfItemsInCart(),
    affiliation: 'Prints of Poe Website',
    currency: 'USD',
    tax: 0,
    shipping: 0,
    coupon: 'Free Shipping',
    transaction_id: v4(),
    items: getItemsArrayFromCart(),
  });
}
