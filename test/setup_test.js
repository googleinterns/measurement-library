goog.module('measurementlibrary.measure.testing.setup');
goog.setTestOnly();

const setup = goog.require('measurementlibrary.measure');

let storageInterface;
let eventProcessor;
let measure;

/**
 * Run a test, once assuming that the measure snippet fired before the call
 * to setup, then again assuming that the measure snippet fired after the call
 * to setup.
 * @param {function()} config The configuration to be done in the
 *     measure code snippet.
 * @param {function()} test The tests to run after both have fired.
 * @param {string} dataLayerName The name of the window property that
 *     contains the data layer.
 */
const runInBothOrders = (config, test, dataLayerName = 'dataLayer') => {
  // The code snippet that is run asynchronously.
  const snippet = () => {
    window[dataLayerName] = window[dataLayerName] || [];
    measure = function() {
      window[dataLayerName].push(arguments);
    };
    config();
  };

  // Test when the snippet fires first.
  snippet();
  setup(dataLayerName);
  test();
  window[dataLayerName] = undefined;

  // Test when the setup function fires first.
  setup(dataLayerName);
  snippet();
  test();
  // Reset for the next test.
  window[dataLayerName] = undefined;
};

describe(`The behavior of the setup function of measurement library`, () => {
  beforeEach(() => {
    storageInterface = jasmine.createSpyObj('storageInterface',
        ['get', 'set', 'config']);
    eventProcessor = jasmine.createSpyObj('eventProcessor',
        ['shouldPersist', 'processEvent', 'config']);
  });

  describe('the state immediately after calling config', () => {
    it('does not call any eventProcessor functions when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              () => measure('config', eventProcessor, storageInterface),
              /* test=  */ () => {
                expect(eventProcessor.shouldPersist).not.toHaveBeenCalled();
                expect(eventProcessor.processEvent).not.toHaveBeenCalled();
                expect(eventProcessor.config).not.toHaveBeenCalled();
              });
        });

    it('does not call any storageInterface functions when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              () => measure('config', eventProcessor, storageInterface),
              /* test= */ () => {
                expect(storageInterface.get).not.toHaveBeenCalled();
                expect(storageInterface.set).not.toHaveBeenCalled();
                expect(storageInterface.config).not.toHaveBeenCalled();
              });
        });

    it('calls the data layer once when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              () => measure('config', eventProcessor, storageInterface),
              /* test=  */ () => {
                expect(window.dataLayer.length).toBe(1);
              });
        });
  });

  it('works with a different name for dataLayer',
      () => {
        runInBothOrders(
            /* config= */
            () => measure('config', eventProcessor, storageInterface),
            /* test=  */ () => {
              expect(window.coolLayer.length).toBe(1);
            },
            /* dataLayerName= */ 'coolLayer');
      });
});
