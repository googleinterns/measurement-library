import {v4} from 'uuid';
import {getEventCodeSnippet, getItemsParameterFromSingleItem, getItemsAndValueParametersFromCart} from '../utils.js';

/**
 * Creates a select_item event code snippet.
 * @param {string} itemId
 * @param {string=} library
 * @return {string} Code snippet of the event.
 */
export function getSelectItemCodeSnippet(itemId, library = "gtag") {
  return getEventCodeSnippet(
      'select_item',
      getItemsParameterFromSingleItem(itemId),
      library
  );
}

/**
 * Creates a view_item event code snippet.
 * @param {string} itemId
 * @param {string=} library
 * @return {string} Code snippet of the event.
 */
export function getViewItemCodeSnippet(itemId, library = "gtag") {
  return getEventCodeSnippet(
      'view_item',
      getItemsParameterFromSingleItem(itemId),
      library
  );
}

/**
 * Creates an add_to_cart event code snippet.
 * @param {string} itemId
 * @param {string=} library
 * @return {string} Code snippet of the event.
 */
export function getAddToCartCodeSnippet(itemId, library = "gtag") {
  return getEventCodeSnippet(
      'add_to_cart',
      getItemsParameterFromSingleItem(itemId),
      library
  );
}

/**
 * Creates a remove_from_cart event code snippet.
 * @param {string} itemId
 * @param {string=} library
 * @return {string} Code snippet of the event.
 */
export function getRemoveFromCartCodeSnippet(itemId, library = "gtag") {
  return getEventCodeSnippet(
      'remove_from_cart',
      getItemsParameterFromSingleItem(itemId),
      library
  );
}

/**
 * Creates a view_cart event code snippet.
 * @param {string=} library
 * @return {string} Code snippet of the event.
 */
export function getViewCartCodeSnippet(library = "gtag") {
  return getEventCodeSnippet('view_cart', {
    ...getItemsAndValueParametersFromCart(),
    currency: 'USD',
    library
  });
}

/**
 * Creates a begin_checkout event code snippet.
 * @param {string=} library
 * @return {string} Code snippet of the event.
 */
export function getBeginCheckoutCodeSnippet(library = "gtag") {
  return getEventCodeSnippet('begin_checkout', {
    ...getItemsAndValueParametersFromCart(),
    currency: 'USD',
    library
  });
}

/**
 * Creates an add_payment_info event code snippet.
 * @param {string=} library
 * @return {string} Code snippet of the event.
 */
export function getAddPaymentInfoCodeSnippet(library = "gtag") {
  return getEventCodeSnippet('add_payment_info', {
    ...getItemsAndValueParametersFromCart(),
    payment_type: 'google_pay',
    currency: 'USD',
    library
  });
}

/**
 * Creates an add_shipping_info event code snippet.
 * @param {string=} library
 * @return {string} Code snippet of the event.
 */
export function getAddShippingInfoCodeSnippet(library = "gtag") {
  return getEventCodeSnippet('add_shipping_info', {
    ...getItemsAndValueParametersFromCart(),
    currency: 'USD',
    coupon: 'Free Shipping',
    shipping_tier: 'Ground',
    library
  });
}

/**
 * Creates a purchase event code snippet.
 * @param {string=} library
 * @return {string} Code snippet of the event.
 */
export function getPurchaseCodeSnippet(library = "gtag") {
  return getEventCodeSnippet('purchase', {
    ...getItemsAndValueParametersFromCart(),
    affiliation: 'Prints of Poe Website',
    currency: 'USD',
    tax: 0,
    shipping: 0,
    coupon: 'Free Shipping',
    transaction_id: v4(),
    library
  });
}
