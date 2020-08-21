goog.module('measurementLibrary.testing.config.configProcessors.buildProcessor');
goog.setTestOnly();

const {buildProcessor_} = goog.require('measurementLibrary.config.configProcessors');
const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

describe('Calling the buildProcessor_ function of configProcessors', () => {
  it('returns an event processor when a valid string is passed', () => {
    expect(buildProcessor_('googleAnalytics', {})).toBeInstanceOf(
      GoogleAnalyticsEventProcessor);
  });

  it('returns an event processor when a class is passed in ', () => {
    expect(buildProcessor_(GoogleAnalyticsEventProcessor, {}))
      .toBeInstanceOf(GoogleAnalyticsEventProcessor);
  });

  it('eeturns false when an invalid string is passed in ', () => {
    expect(buildProcessor_('unimplemented', {})).toEqual(null);
  });
});

