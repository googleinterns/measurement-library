goog.module('measurementLibrary.testing.config.GoogleAnalyticsEventProcessor.constructor');
goog.setTestOnly();

const {getConstructor_, construct_} = goog.require('measurementLibrary.config.configProcessors');

const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

describe('Calling the getConstructor_ function of configProcessors', () => {
  class MockStorage {
    constructor() {
      this.load = load;
      this.save = save;
    }
  }

  it('does nothing when a class is passed in ', () => {
    expect(getConstructor_(GoogleAnalyticsEventProcessor, true))
        .toBe(GoogleAnalyticsEventProcessor);

    expect(getConstructor_(MockStorage, false)).toBe(MockStorage);
  });

  it('Returns a constructor for an event processor when the right string ' +
      'is passed in ', () => {
    const Analytics = getConstructor_('googleAnalytics', true);

    expect(construct_(Analytics, {})).toEqual(
        jasmine.objectContaining({
          processEvent: jasmine.any(Function),
          persistTime: jasmine.any(Function),
        })
    );
  });

  it('Returns a constructor for an event processor when a class is passed in ',
      () => {
        const Analytics = getConstructor_(GoogleAnalyticsEventProcessor, true);

        expect(construct_(Analytics, {})).toEqual(
            jasmine.objectContaining({
              processEvent: jasmine.any(Function),
              persistTime: jasmine.any(Function),
            }));
      });

  it('Returns false when the wrong string is passed in ', () => {
    const Class = getConstructor_('unimplemented', true);

    expect(construct_(Class, {})).toEqual(false);
  });
});

