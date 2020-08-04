goog.module('measurementLibrary.measure.testing.setup');
goog.setTestOnly();

/**
 * Run a test, once assuming that the measure snippet fired before the call
 * to setup, then again assuming that the measure snippet fired after the call
 * to setup.
 * When the measurement library is added to a html page, it is loaded
 * asynchronously with a setup snippet. Hence, the two code blocks can
 * run in either order. This function ensures that the library has the same
 * behavior no matter which code is executed first.
 *
 * @param {function(!Array<*>):undefined} config The configuration
 *     to be done in the measure code snippet.
 * @param {function(!Array<*>):undefined} test The tests to run
 *     after both the code snippet and setupMeasure function have fired.
 */
function executeSnippetBeforeAndAfterSetup(config, test) {
  let snippet;
  let dataLayer;
  beforeEach(() => {
    dataLayer = [];
    // The code snippet that is run asynchronously.
    snippet = (dataLayer) => {
      const measure = function() {
        dataLayer.push(arguments);
      };
      config(measure);
    };
  });
  it('runs snippet first', () => {
    snippet(dataLayer);
    setupMeasure(dataLayer);
    test(dataLayer);
  });

  it('runs setup first', () => {
    setupMeasure(dataLayer);
    snippet(dataLayer);
    test(dataLayer);
  });
}

describe(`The behavior of the setup function of measurement library`, () => {
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

  beforeEach(() => {
    get = jasmine.createSpy('get');
    set = jasmine.createSpy('set');
    persistTime = jasmine.createSpy('persistTime');
    processEvent = jasmine.createSpy('processEvent');
  });

  describe('the state immediately after calling config', () => {
    describe('does not call any eventProcessor functions' +
        ' when initially configured', () => {
      executeSnippetBeforeAndAfterSetup(
          /* config= */
          (measure) =>
              measure('config', MockProcessor, {}, MockStorage, {}),
          /* test=  */ () => {
            expect(persistTime).not.toHaveBeenCalled();
            expect(processEvent).not.toHaveBeenCalled();
          });
    });

    describe('does not call any storageInterface functions when ' +
        'initially configured', () => {
      executeSnippetBeforeAndAfterSetup(
          /* config= */
          (measure) =>
              measure('config', MockProcessor, {}, MockStorage, {}),
          /* test= */ () => {
            expect(get).not.toHaveBeenCalled();
            expect(set).not.toHaveBeenCalled();
          });
    });

    describe('calls the data layer once when initially configured', () => {
      executeSnippetBeforeAndAfterSetup(
          /* config= */
          (measure) =>
              measure('config', MockProcessor, {}, MockStorage,
                  {}),
          /* test=  */ (dataLayer) => {
            expect(dataLayer.length).toBe(1);
          });
    });
  });
});
