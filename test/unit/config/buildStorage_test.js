goog.module('measurementLibrary.testing.config.configProcessors.buildStorage');
goog.setTestOnly();

const {buildStorage_} = goog.require('measurementLibrary.config.configProcessors');
const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

describe('Calling the buildStorage_ function of configProcessors', () => {
  // TODO(wolfblue@) Add tests for when a real storage is passed.
  it('returns false when the wrong string is passed in ', () => {
    expect(buildStorage_('unimplemented', {})).toEqual(null);
  });
});

