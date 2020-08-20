goog.module('measurementLibrary.testing.config.processEventConstructor');
goog.setTestOnly();

describe('After calling measure with `event` as the first parameter', () => {
  let load;
  let save;
  let persistTime;
  let processEvent;
  let measure;
  let dataLayer;

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
    static getName() {
      return 'processor';
    }
  }

  beforeEach(() => {
    load = jasmine.createSpy('load');
    save = jasmine.createSpy('save');
    persistTime = jasmine.createSpy('persistTime');
    processEvent = jasmine.createSpy('processEvent');
    // Reset the data layer we are using.
    dataLayer = [];
    measure = function() {
      dataLayer.push(arguments);
    };
    setupMeasure(dataLayer);
  });


  describe('The call forwarded after a call to measure(`event`, ...)', () => {
    it('inherits any parameters from set called before the constructor',
      () => {
        measure('set', 'processor', {'cat': 'meow'});
        measure('config', MockProcessor, {'dog': 'woof'}, MockStorage, {});
        measure('event', 'name');
        expect(processEvent).toHaveBeenCalledWith(
          jasmine.any(MockStorage), {
            get: jasmine.any(Function),
            set: jasmine.any(Function),
          }, 'name', {'cat': 'meow', 'dog': 'woof'});
      });

    it('inherits any parameters from set called after the constructor',
      () => {
        measure('config', MockProcessor, {'dog': 'woof'}, MockStorage, {});
        measure('set', 'processor', {'cat': 'meow'});
        measure('event', 'name');
        expect(processEvent).toHaveBeenCalledWith(
          jasmine.any(MockStorage), {
            get: jasmine.any(Function),
            set: jasmine.any(Function),
          }, 'name', {'cat': 'meow', 'dog': 'woof'});
      });

    it('does not inherit if set is called unscoped', () => {
      measure('config', MockProcessor, {'dog': 'woof'}, MockStorage, {});
      measure('set', {'cat': 'meow'});
      measure('event', 'name');
      expect(processEvent).toHaveBeenCalledWith(
        jasmine.any(MockStorage), {
          get: jasmine.any(Function),
          set: jasmine.any(Function),
        }, 'name', {'dog': 'woof'});
    });

    it('inherits from the config constructor over the set constructor', () => {
      measure('set', 'processor', {'cat': 'bad'});
      measure('config', MockProcessor, {'cat': 'meow'}, MockStorage, {});
      measure('event', 'name');
      expect(processEvent).toHaveBeenCalledWith(
        jasmine.any(MockStorage), {
          get: jasmine.any(Function),
          set: jasmine.any(Function),
        }, 'name', {'cat': 'meow'});
    });

    it('inherits from the event constructor if possible', () => {
      measure('set', 'processor', {'cat': 'bad'});
      measure('config', MockProcessor, {'cat': 'meow'}, MockStorage, {});
      measure('event', 'name', {'cat': 'meowzer'});
      expect(processEvent).toHaveBeenCalledWith(
        jasmine.any(MockStorage), {
          get: jasmine.any(Function),
          set: jasmine.any(Function),
        }, 'name', {'cat': 'meowzer'});
    });
  });
});
