goog.module('measurementlibrary.measure');

const {DataLayerHelper} = goog.require('helper');

/**
 * Listen to events passed to the current window.dataLayer (or a new one
 * if none exist).
 */
function setup() {
  /**
   * @global {!Array} The data layer of the application, storing a record of
   * events that have changed over time.
   */
  window.dataLayer = window.dataLayer || [];

  /**
   * @const {!DataLayerHelper} The DataLayerHelper to use with this application.
   */
  const helper = new DataLayerHelper(window.dataLayer);

  // TODO
}

setup();

exports = setup;
