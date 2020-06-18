import {v4} from 'uuid';
import {event} from './gtag.js';
import {getItemParameters, getItemsArrayFromCart, computePriceOfItemsInCart} from '../utils.js';

/**
 * Sends a select_item event to Google Analytics.
 * Can be spoofed to return mock code snippet of event instead.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 * @param {boolean=} spoof If true, returns mock code instead of sending event.
 * @return {string} Code snippet of the event being sent.
 */
export function selectItem(itemId, spoof = false) {
  return event('select_item', {
    items: [
      ...getItemParameters(itemId),
    ],
  }, spoof);
}

/**
 * Sends an add_to_cart event to Google Analytics.
 * Can be spoofed to return mock code snippet of event instead.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 * @param {boolean=} spoof If true, returns mock code instead of sending event.
 * @return {?string} Code snippet of the event being sent.
 */
export function addToCart(itemId, spoof = false) {
  return event('add_to_cart', {
    items: [
      ...getItemParameters(itemId),
    ],
  }, spoof);
}

/**
 * Sends a remove_from_cart event to Google Analytics.
 * Can be spoofed to return mock code snippet of event instead.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 * @param {boolean=} spoof If true, returns mock code instead of sending event.
 * @return {?string} Code snippet of the event being sent.
 */
export function removeFromCart(itemId, spoof = false) {
  return event('remove_from_cart', {
    items: [
      ...getItemParameters(itemId),
    ],
  }, spoof);
}

/**
 * Sends a view_cart event to Google Analytics.
 * Can be spoofed to return mock code snippet of event instead.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {boolean=} spoof If true, returns mock code instead of sending event.
 * @return {?string} Code snippet of the event being sent.
 */
export function viewCart(spoof = false) {
  return event('view_cart', {
    value: computePriceOfItemsInCart(),
    currency: 'USD',
    items: getItemsArrayFromCart(),
  }, spoof);
}

/**
 * Sends a begin_checkout event to Google Analytics.
 * Can be spoofed to return mock code snippet of event instead.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {boolean=} spoof If true, returns mock code instead of sending event.
 * @return {?string} Code snippet of the event being sent.
 */
export function beginCheckout(spoof = false) {
  return event('begin_checkout', {
    value: computePriceOfItemsInCart(),
    currency: 'USD',
    items: getItemsArrayFromCart(),
  }, spoof);
}

/**
 * Sends an add_payment_info event to Google Analytics.
 * Can be spoofed to return mock code snippet of event instead.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {boolean=} spoof If true, returns mock code instead of sending event.
 * @return {?string} Code snippet of the event being sent.
 */
export function addPaymentInfo(spoof = false) {
  return event('add_payment_info', {
    value: computePriceOfItemsInCart(),
    payment_type: 'google_pay',
    currency: 'USD',
    items: getItemsArrayFromCart(),
  }, spoof);
}

/**
 * Sends an add_shipping_info event to Google Analytics.
 * Can be spoofed to return mock code snippet of event instead.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {boolean=} spoof If true, returns mock code instead of sending event.
 * @return {?string} Code snippet of the event being sent.
 */
export function addShippingInfo(spoof = false) {
  return event('add_shipping_info', {
    value: computePriceOfItemsInCart(),
    currency: 'USD',
    coupon: 'Free Shipping',
    shipping_tier: 'Ground',
    items: getItemsArrayFromCart(),
  }, spoof);
}

/**
 * Sends a purchase event to Google Analytics.
 * Can be spoofed to return mock code snippet of event instead.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {boolean=} spoof If true, returns mock code instead of sending event.
 * @return {?string} Code snippet of the event being sent.
 */
export function purchase(spoof = false) {
  return event('purchase', {
    value: computePriceOfItemsInCart(),
    affiliation: 'Prints of Poe Website',
    currency: 'USD',
    tax: 0,
    shipping: 0,
    coupon: 'Free Shipping',
    transaction_id: v4(),
    items: getItemsArrayFromCart(),
  }, spoof);
}
