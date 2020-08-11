goog.module('measurementLibrary.testing.config.setup');
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
  let dataLayer;
  // The code snippet that is run asynchronously.
  let snippet;

  // Before each test, reset the data layer state, and create
  // a snippet function that emulates a user-defined measurement library
  // code snippet with options given by the code in the `config` variable.
  beforeEach(() => {
    // Reset the data layer we are using.
    dataLayer = [];
    snippet = (dataLayer) => {
      const measure = function() {
        dataLayer.push(arguments);
      };
      config(measure);
    };
  });

  it('assuming the measure snippet ran first', () => {
    snippet(dataLayer);
    setupMeasure(dataLayer);
    test(dataLayer);
  });

  it('assuming the setupMeasure function ran first', () => {
    setupMeasure(dataLayer);
    snippet(dataLayer);
    test(dataLayer);
  });
}

describe('After calling the setupMeasure function of setup', () => {
  let load;
  let save;
  let persistTime;
  let processEvent;

  // Create a Mock Storage and Mock Processor object. Note that we cannot
  // use jasmine.createSpyObject since it does not have a constructor.
  // We need a class that will create an instance of itself that we can then
  // access. Here this is done by making each method a spy.
  class MockStorage {
    constructor() {
      this.load = load;
      this.save = save;
    }
  }

  class MockProcessor {
    constructor() {
      this.persistTime = persistTime;
      this.processEvent = processEvent;
    }
  }

  beforeEach(() => {
    load = jasmine.createSpy('load');
    save = jasmine.createSpy('save');
    persistTime = jasmine.createSpy('persistTime');
    processEvent = jasmine.createSpy('processEvent');
  });

  describe(`calling the config function of measurement library`, () => {
    describe('does not call any eventProcessor functions', () => {
      executeSnippetBeforeAndAfterSetup(
          /* config= */
          (measure) =>
              measure('config', MockProcessor, {}, MockStorage, {}),
          /* test=  */ () => {
            expect(persistTime).not.toHaveBeenCalled();
            expect(processEvent).not.toHaveBeenCalled();
          });
    });

    describe('does not call any storageInterface functions', () => {
      executeSnippetBeforeAndAfterSetup(
          /* config= */
          (measure) =>
              measure('config', MockProcessor, {}, MockStorage, {}),
          /* test= */ () => {
            expect(load).not.toHaveBeenCalled();
            expect(save).not.toHaveBeenCalled();
          });
    });

    describe('makes one call to the data layer', () => {
      executeSnippetBeforeAndAfterSetup(
          /* config= */
          (measure) =>
              measure('config', MockProcessor, {}, MockStorage,
                  {}),
          /* test=  */ (dataLayer) => {
            expect(dataLayer.length).toBe(1);
          });
    });

    describe('Does not crash when unsupported strings are passed in', () => {
      executeSnippetBeforeAndAfterSetup(
          /* config= */
          (measure) =>
              measure('config', 'unusedProcessorName', {}, 'unusedStorageName',
                  {}),
          /* test=  */ (dataLayer) => {
            expect(dataLayer.length).toBe(1);
          });
    });

    describe('Does not crash when non string non constructable' +
        'object is passed', () => {
      executeSnippetBeforeAndAfterSetup(
          /* config= */
          (measure) =>
              measure('config', new Date(), {}, [1, 2, 3],
                  {}),
          /* test=  */ (dataLayer) => {
            expect(dataLayer.length).toBe(1);
          });
    });
  });

  describe('the behavior after a call to event', () => {
    describe('calls the processEvent function once after an event is pushed',
        () => {
          executeSnippetBeforeAndAfterSetup(
              /* config= */ (measure) => {
                measure('config', MockProcessor, {}, MockStorage, {});
                measure('event', 'name');
              },
              /* test= */ () => {
                expect(processEvent).toHaveBeenCalledTimes(1);
              });
        });

    describe('calls the processEvent function with parameters ' +
        'storageInterface, a helper interface, name, and {} by default',
        () => {
          executeSnippetBeforeAndAfterSetup(
              /* config= */ (measure) => {
                measure('config', MockProcessor, {}, MockStorage, {});
                measure('event', 'name');
              },
              /* test= */ () => {
                expect(processEvent).toHaveBeenCalledWith(
                    jasmine.any(MockStorage), {
                      get: jasmine.any(Function),
                      set: jasmine.any(Function),
                    }, 'name', {});
              });
        });

    describe('passes nested options parameter to processEvent', () => {
      executeSnippetBeforeAndAfterSetup(
          /* config= */ (measure) => {
            measure('config', MockProcessor, {}, MockStorage, {});
            measure('event', 'EVENTNAME',
                {'hi': 'hello', 'what': {'is': 'up'}});
          },
          /* test= */ () => {
            expect(processEvent).toHaveBeenCalledWith(
                jasmine.any(MockStorage), {
                  get: jasmine.any(Function),
                  set: jasmine.any(Function),
                }, 'EVENTNAME', {'hi': 'hello', 'what': {'is': 'up'}});
          });
    });
  });
});
