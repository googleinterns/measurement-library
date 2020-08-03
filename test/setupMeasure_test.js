goog.module('measurementLibrary.measure.testing.setup');
goog.setTestOnly();

const runInBothOrders = goog.require('measurementLibrary.measure.testing.utils');

describe(`The behavior of the setup function of measurement library`, () => {
  beforeEach(reset);

  let storageInterface;
  let eventProcessor;

  /** Reset all the global variables for a new test. */
  function reset() {
    storageInterface = jasmine.createSpyObj('storageInterface',
        ['get', 'set']);
    eventProcessor = jasmine.createSpyObj('eventProcessor',
        ['persistTime', 'processEvent']);
  }

  describe('the state immediately after calling config', () => {
    it('does not call any eventProcessor functions when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              (measure) =>
                  measure('config', eventProcessor, {}, storageInterface, {}),
              /* test=  */ () => {
                expect(eventProcessor.persistTime).not.toHaveBeenCalled();
                expect(eventProcessor.processEvent).not.toHaveBeenCalled();
        });

    it('does not call any storageInterface functions when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              (measure) =>
                  measure('config', eventProcessor, {}, storageInterface, {}),
              /* test= */ () => {
                expect(storageInterface.get).not.toHaveBeenCalled();
                expect(storageInterface.set).not.toHaveBeenCalled();
        });

    it('calls the data layer once when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              (measure) =>
                  measure('config', eventProcessor, {}, storageInterface, {}),
              /* test=  */ (dataLayer) => {
                expect(dataLayer.length).toBe(1);
              }, reset);
        });
  });
});
