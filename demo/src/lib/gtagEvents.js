import {v4} from 'uuid';
import {event} from './gtag.js';
import {getItemsParameterFromSingleItem, getItemsAndValueParametersFromCart} from '../utils.js';

/**
 * Sends a select_item event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 */
export function sendSelectItemEvent(itemId) {
  event('select_item', getItemsParameterFromSingleItem(itemId));
}

/**
 * Sends a view_item event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 */
export function sendViewItemEvent(itemId) {
  event('view_item', getItemsParameterFromSingleItem(itemId));
}

/**
 * Sends an add_to_cart event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 */
export function sendAddToCartEvent(itemId) {
  event('add_to_cart', getItemsParameterFromSingleItem(itemId));
}

/**
 * Sends a remove_from_cart event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 * @param {string} itemId
 */
export function sendRemoveFromCartEvent(itemId) {
  event('remove_from_cart', getItemsParameterFromSingleItem(itemId));
}

/**
 * Sends a view_cart event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 */
export function sendViewCartEvent() {
  event('view_cart', {
    ...getItemsAndValueParametersFromCart(),
    currency: 'USD',
  });
}

/**
 * Sends a begin_checkout event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 */
export function sendBeginCheckoutEvent() {
  event('begin_checkout', {
    ...getItemsAndValueParametersFromCart(),
    currency: 'USD',
  });
}

/**
 * Sends an add_payment_info event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 */
export function sendAddPaymentInfoEvent() {
  event('add_payment_info', {
    ...getItemsAndValueParametersFromCart(),
    payment_type: 'google_pay',
    currency: 'USD',
  });
}

/**
 * Sends an add_shipping_info event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 */
export function sendAddShippingInfoEvent() {
  event('add_shipping_info', {
    ...getItemsAndValueParametersFromCart(),
    currency: 'USD',
    coupon: 'Free Shipping',
    shipping_tier: 'Ground',
  });
}

/**
 * Sends a purchase event to Google Analytics.
 * View the [Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
 * to review the event and its accepted parameters.
 */
export function sendPurchaseEvent() {
  event('purchase', {
    ...getItemsAndValueParametersFromCart(),
    affiliation: 'Prints of Poe Website',
    currency: 'USD',
    tax: 0,
    shipping: 0,
    coupon: 'Free Shipping',
    transaction_id: v4(),
  });
}
