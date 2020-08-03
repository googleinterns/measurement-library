goog.module('measurementLibrary.measure.testing.setup');
goog.setTestOnly();

const {runInBothOrders} = goog.require(
    'measurementLibrary.measure.testing.utils');

describe(`The behavior of the setup function of measurement library`, () => {
  beforeEach(reset);

  let get;
  let set;
  let persistTime;
  let processEvent;

  // Create a Mock Storage and Mock Processor object. Note that we cannot
  // use jasmine.createSpyObject since it does not have a constructor.
  // We need a class that will create an instance of itself that we can then
  // access. Here this is done by making each method a spy.
  class MockStorage {
    constructor() {
      this.get = get;
      this.set = set;
    }
  }

  class MockProcessor {
    constructor() {
      this.persistTime = persistTime;
      this.processEvent = processEvent;
    }
  }

  /** Reset all the global variables for a new test. */
  function reset() {
    get = jasmine.createSpy('get');
    set = jasmine.createSpy('set');
    persistTime = jasmine.createSpy('persistTime');
    processEvent = jasmine.createSpy('processEvent');
  }

  describe('the state immediately after calling config', () => {
    it('does not call any eventProcessor functions when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              (measure) =>
                  measure('config', MockProcessor, {}, MockStorage, {}),
              /* test=  */ () => {
                expect(persistTime).not.toHaveBeenCalled();
                expect(processEvent).not.toHaveBeenCalled();
              });
        });

    it('does not call any storageInterface functions when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              (measure) =>
                  measure('config', MockProcessor, {}, MockStorage,
                      {}),
              /* test= */ () => {
                expect(get).not.toHaveBeenCalled();
                expect(set).not.toHaveBeenCalled();
              });
        });

    it('calls the data layer once when initially configured',
        () => {
          runInBothOrders(
              /* config= */
              (measure) =>
                  measure('config', MockProcessor, {}, MockStorage,
                      {}),
              /* test=  */ (dataLayer) => {
                expect(dataLayer.length).toBe(1);
              }, reset);
        });
  });
});
