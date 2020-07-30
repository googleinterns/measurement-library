goog.module('measurement_library.setup');

const {DataLayerHelper} = goog.require('helper');

/**
 * Listen to events passed to the given dataLayer (or a new one
 * if none exist).
 *
 * @param {!Array<*>} dataLayer The data layer to add listeners to.
 */
function setupMeasure(dataLayer) {
  /**
   * The DataLayerHelper to use with this application.
   * @private @const {!DataLayerHelper}
   */
  const helper = new DataLayerHelper(dataLayer);

  /**
   * A map from user-registered names to instances of event processors.
   * @private @const {!Object<string, !EventProcessor>}
   */
  const eventInstances = {};

  /**
   * A map from user-registered names to storage instances.
   * @private @const {!Object<string, !StorageInterface>}
   */
  const storageInstances = {};

   // TODO: Use the variables declared above
}

goog.exportSymbol('setupMeasure', setupMeasure);
exports = setupMeasure;
