goog.module('measurementlibrary.measure');

const {DataLayerHelper} = goog.require('helper');

/**
 * Listen to events passed to the given dataLayer (or a new one
 * if none exist).
 *
 * @param {!Array<*>} dataLayer The data layer to add listeners to.
 */
function setup(dataLayer) {
  /**
   * @const {!DataLayerHelper} The DataLayerHelper to use with this application.
   */
  const helper = new DataLayerHelper(dataLayer);

  // TODO
}

exports = setup;
