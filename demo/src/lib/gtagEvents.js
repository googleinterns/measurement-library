import {v4} from 'uuid';
import {event} from './gtag.js';
import {getItemParameters, getItemsArrayFromCart, computePriceOfItemsInCart} from '../utils.js';

/**
 * Sends a select_item event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 */
export function sendSelectItemEvent(itemId) {
  event('select_item', {
    items: [
      ...getItemParameters(itemId),
    ],
  });
}

/**
 * Sends a view_item event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 */
export function sendViewItemEvent(itemId) {
  event('view_item', {
    items: [
      ...getItemParameters(itemId),
    ],
  });
}

/**
 * Sends an add_to_cart event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 */
export function sendAddToCartEvent(itemId) {
  event('add_to_cart', {
    items: [
      ...getItemParameters(itemId),
    ],
  });
}

/**
 * Sends a remove_from_cart event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 */
export function sendRemoveFromCartEvent(itemId) {
  event('remove_from_cart', {
    items: [
      ...getItemParameters(itemId),
    ],
  });
}

/**
 * Sends a view_cart event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 */
export function sendViewCartEvent() {
  event('view_cart', {
    value: computePriceOfItemsInCart(),
    currency: 'USD',
    items: getItemsArrayFromCart(),
  });
}

/**
 * Sends a begin_checkout event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 */
export function sendBeginCheckoutEvent() {
  event('begin_checkout', {
    value: computePriceOfItemsInCart(),
    currency: 'USD',
    items: getItemsArrayFromCart(),
  });
}

/**
 * Sends an add_payment_info event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 */
export function sendAddPaymentInfoEvent() {
  event('add_payment_info', {
    value: computePriceOfItemsInCart(),
    payment_type: 'google_pay',
    currency: 'USD',
    items: getItemsArrayFromCart(),
  });
}

/**
 * Sends an add_shipping_info event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 */
export function sendAddShippingInfoEvent() {
  event('add_shipping_info', {
    value: computePriceOfItemsInCart(),
    currency: 'USD',
    coupon: 'Free Shipping',
    shipping_tier: 'Ground',
    items: getItemsArrayFromCart(),
  });
}

/**
 * Sends a purchase event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 */
export function sendPurchaseEvent() {
  event('purchase', {
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
