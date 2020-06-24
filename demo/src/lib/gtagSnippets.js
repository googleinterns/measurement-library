import {v4} from 'uuid';
import {getEventCodeSnippet, getItemsParameterFromSingleItem, getItemsAndValueParametersFromCart} from '../utils.js';

/**
 * Creates a select_item event code snippet.
 * @param {string} itemId
 * @return {string} Code snippet of the event.
 */
export function getSelectItemCodeSnippet(itemId) {
  return getEventCodeSnippet(
      'select_item',
      getItemsParameterFromSingleItem(itemId),
  );
}

/**
 * Creates a view_item event code snippet.
 * @param {string} itemId
 * @return {string} Code snippet of the event.
 */
export function getViewItemCodeSnippet(itemId) {
  return getEventCodeSnippet(
      'view_item',
      getItemsParameterFromSingleItem(itemId),
  );
}

/**
 * Creates an add_to_cart event code snippet.
 * @param {string} itemId
 * @return {string} Code snippet of the event.
 */
export function getAddToCartCodeSnippet(itemId) {
  return getEventCodeSnippet(
      'add_to_cart',
      getItemsParameterFromSingleItem(itemId),
  );
}

/**
 * Creates a remove_from_cart event code snippet.
 * @param {string} itemId
 * @return {string} Code snippet of the event.
 */
export function getRemoveFromCartCodeSnippet(itemId) {
  return getEventCodeSnippet(
      'remove_from_cart',
      getItemsParameterFromSingleItem(itemId),
  );
}

/**
 * Creates a view_cart event code snippet.
 * @return {string} Code snippet of the event.
 */
export function getViewCartCodeSnippet() {
  return getEventCodeSnippet('view_cart', {
    ...getItemsAndValueParametersFromCart(),
    currency: 'USD',
  });
}

/**
 * Creates a begin_checkout event code snippet.
 * @return {string} Code snippet of the event.
 */
export function getBeginCheckoutCodeSnippet() {
  return getEventCodeSnippet('begin_checkout', {
    ...getItemsAndValueParametersFromCart(),
    currency: 'USD',
  });
}

/**
 * Creates an add_payment_info event code snippet.
 * @return {string} Code snippet of the event.
 */
export function getAddPaymentInfoCodeSnippet() {
  return getEventCodeSnippet('add_payment_info', {
    ...getItemsAndValueParametersFromCart(),
    payment_type: 'google_pay',
    currency: 'USD',
  });
}

/**
 * Creates an add_shipping_info event code snippet.
 * @return {string} Code snippet of the event.
 */
export function getAddShippingInfoCodeSnippet() {
  return getEventCodeSnippet('add_shipping_info', {
    ...getItemsAndValueParametersFromCart(),
    currency: 'USD',
    coupon: 'Free Shipping',
    shipping_tier: 'Ground',
  });
}

/**
 * Creates a purchase event code snippet.
 * @return {string} Code snippet of the event.
 */
export function getPurchaseCodeSnippet() {
  return getEventCodeSnippet('purchase', {
    ...getItemsAndValueParametersFromCart(),
    affiliation: 'Prints of Poe Website',
    currency: 'USD',
    tax: 0,
    shipping: 0,
    coupon: 'Free Shipping',
    transaction_id: v4(),
  });
}
