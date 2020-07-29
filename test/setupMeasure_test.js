goog.module('measurement_library.measure.testing.setup');
goog.setTestOnly();

const runInBothOrders = goog.require('measurement_library.measure.testing.utils');

describe(`The behavior of the setup function of measurement library`, () => {
  beforeEach(reset);

  let storageInterface;
  let eventProcessor;

  /** Reset all the global variables for a new test. */
  function reset() {
    storageInterface = jasmine.createSpyObj('storageInterface',
        ['get', 'set', 'config']);
    eventProcessor = jasmine.createSpyObj('eventProcessor',
        ['shouldPersist', 'processEvent', 'config']);
  }

  describe('the state immediately after calling config', () => {
    it('does not call any eventProcessor functions when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              (measure) =>
                  measure('config', eventProcessor, storageInterface),
              /* test=  */ () => {
                expect(eventProcessor.persistTime).not.toHaveBeenCalled();
                expect(eventProcessor.processEvent).not.toHaveBeenCalled();
                expect(eventProcessor.config).not.toHaveBeenCalled();
              }, reset);
        });

    it('does not call any storageInterface functions when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              (measure) =>
                  measure('config', eventProcessor, storageInterface),
              /* test= */ () => {
                expect(storageInterface.get).not.toHaveBeenCalled();
                expect(storageInterface.set).not.toHaveBeenCalled();
                expect(storageInterface.config).not.toHaveBeenCalled();
              }, reset);
        });

    it('calls the data layer once when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              (measure) =>
                  measure('config', eventProcessor, storageInterface),
              /* test=  */ (dataLayer) => {
                expect(dataLayer.length).toBe(1);
              }, reset);
        });
  });
});
