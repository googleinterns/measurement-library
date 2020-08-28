goog.module('measurementLibrary.testing.config.configProcessors.buildProcessor');
goog.setTestOnly();

const {buildProcessor_} = goog.require('measurementLibrary.config.configProcessors');
const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

let processorConstructor;

class MockProcessor {
  constructor() {
    processorConstructor.apply(this, arguments);
  }
  static getName() {
    return 'processor';
  }
}

describe('When calling the `buildProcessor_` function ' +
    'of configProcessors', () => {
  beforeEach(() => {
    processorConstructor = jasmine.createSpy('processorConstructor');
  });

  describe('with no parameters', () => {
    it('returns an event processor when a valid string is passed', () => {
      expect(buildProcessor_('googleAnalytics', {}, null)).toBeInstanceOf(
          GoogleAnalyticsEventProcessor);
    });

    it('returns an event processor when a class is passed in ', () => {
      expect(buildProcessor_(GoogleAnalyticsEventProcessor, {}, null))
          .toBeInstanceOf(GoogleAnalyticsEventProcessor);
    });

    it('returns false when an invalid string is passed in ', () => {
      expect(buildProcessor_('unimplemented', {}, null)).toEqual(null);
    });
  });

  describe('the event processor constructor', () => {
    let helper;
    let measure;
    beforeEach(() => {
      const dataLayer = [];
      helper = new DataLayerHelper(dataLayer);
      measure = function() {
        dataLayer.push(arguments);
      };
    });

    it('has the empty object as a parameter if helper and params are empty',
        () => {
          buildProcessor_(MockProcessor, {}, helper);
          expect(processorConstructor).toHaveBeenCalledWith({});
        });

    it('inherits parameters from constructor parameters', () => {
      buildProcessor_(MockProcessor, {a: 1, b: 2}, helper);
      expect(processorConstructor).toHaveBeenCalledWith({a: 1, b: 2});
    });

    it('inherits parameters from the given helper parameters', () => {
      measure('set', 'processor', {a: {a: 1}});
      measure('set', 'processor', {b: 2});
      buildProcessor_(MockProcessor, {}, helper);
      expect(processorConstructor).toHaveBeenCalledWith({a: {a: 1}, b: 2});
    });

    it('inherits both constructor and helper parameters', () => {
      measure('set', 'processor', {a: {a: 1}});
      buildProcessor_(MockProcessor, {b: 2}, helper);
      expect(processorConstructor).toHaveBeenCalledWith({a: {a: 1}, b: 2});
    });

    it('overwrites constructor parameters over helper parameters', () => {
      measure('set', 'processor', {a: 2});
      buildProcessor_(MockProcessor, {a: 1}, helper);
      expect(processorConstructor).toHaveBeenCalledWith({a: 1});
    });

    // This behavior may be changed in the future to be a deep copy.
    it('overwrites constructor parameters over helper parameters using a ' +
        'shallow copy', () => {
      measure('set', 'processor', {a: {b: 1}});
      buildProcessor_(MockProcessor, {a: {a: 1}}, helper);
      expect(processorConstructor).toHaveBeenCalledWith({a: {a: 1}});
    });
  });
});

