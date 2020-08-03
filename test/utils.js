goog.module('measurementLibrary.measure.testing.utils');
goog.setTestOnly();

const setupMeasure = goog.require('measurementLibrary.setup');

const noop = () => {};

/**
 * Run a test, once assuming that the measure snippet fired before the call
 * to setup, then again assuming that the measure snippet fired after the call
 * to setup.
 * @param {function(!Array<*>):undefined} config The configuration
 *     to be done in the measure code snippet.
 * @param {function(!Array<*>):undefined} test The tests to run
 *     after both the code snippet and setupMeasure function have fired.
 * @param {function():undefined} reset A function to reset state between tests.
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

exports = {runInBothOrders};
