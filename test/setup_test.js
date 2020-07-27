goog.module('measurementlibrary.measure.testing.setup');
goog.setTestOnly();

const setup = goog.require('measurementlibrary.measure');

let storageInterface;
let eventProcessor;
let measure;
let dataLayer;

/** Reset all the global variables for a new test. */
function reset() {
  storageInterface = jasmine.createSpyObj('storageInterface',
      ['get', 'set', 'config']);
  eventProcessor = jasmine.createSpyObj('eventProcessor',
      ['shouldPersist', 'processEvent', 'config']);
  measure = undefined;
  dataLayer = [];
}

/**
 * Run a test, once assuming that the measure snippet fired before the call
 * to setup, then again assuming that the measure snippet fired after the call
 * to setup.
 * @param {function()} config The configuration to be done in the
 *     measure code snippet.
 * @param {function()} test The tests to run after both have fired.
 */
const runInBothOrders = (config, test) => {
  // The code snippet that is run asynchronously.
  const snippet = (dataLayer) => {
    measure = function() {
      dataLayer.push(arguments);
    };
    config();
  };

  reset();
  // Test when the snippet fires first.
  snippet(dataLayer);
  setup(dataLayer);
  test();

  reset();
  // Test when the setup function fires first.
  setup(dataLayer);
  snippet(dataLayer);
  test();
};

describe(`The behavior of the setup function of measurement library`, () => {
  beforeEach(reset);

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
                expect(dataLayer.length).toBe(1);
              });
        });
  });

  it('works with a different name for dataLayer',
      () => {
        runInBothOrders(
            /* config= */
            () => measure('config', eventProcessor, storageInterface),
            /* test=  */ () => {
              expect(dataLayer.length).toBe(1);
            });
      });
});
