goog.module('measurementlibrary.measure');

const {DataLayerHelper} = goog.require('helper');

/**
 * Listen to events passed to the current window.dataLayer (or a new one
 * if none exist).
 *
 * @param {string=} name The name of the window property that contains
 *     the data layer.
 */
function setup(name = undefined) {
  // Setting default parameters this way saves 10 bytes in the compiled code.
  if (name === undefined) name = 'dataLayer';

  /**
   * @global {!Array} The data layer of the application, storing a record of
   * events that have changed over time.
   */
  window[name] = window[name] || [];

  /**
   * @const {!DataLayerHelper} The DataLayerHelper to use with this application.
   */
  const helper = new DataLayerHelper(window[name]);

  // TODO
}

setup();

exports = setup;
