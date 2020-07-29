goog.module('measurement_library.measure.testing.utils');
goog.setTestOnly();

const setupMeasure = goog.require('measurement_library.setup');

const noop = () => {
};

/**
 * Run a test, once assuming that the measure snippet fired before the call
 * to setup, then again assuming that the measure snippet fired after the call
 * to setup.
 * @param {function(!Array<*>)} config The configuration to be done in the
 *     measure code snippet.
 * @param {function(!Array<*>)} test The tests to run after both have fired.
 * @param {function()} reset A function to reset state between tests.
 */
function runInBothOrders(config, test, reset = noop) {
  // The code snippet that is run asynchronously.
  const snippet = (dataLayer) => {
    const measure = function() {
      dataLayer.push(arguments);
    };
    config(measure);
  };
  // Test when the snippet fires first.
  let dataLayer = [];
  reset();
  snippet(dataLayer);
  setupMeasure(dataLayer);
  test(dataLayer);

  // Test when the setup function fires first.
  dataLayer = [];
  reset();
  setupMeasure(dataLayer);
  snippet(dataLayer);
  test(dataLayer);
}

exports = runInBothOrders;
