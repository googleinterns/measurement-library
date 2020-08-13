goog.module('measurementLibrary.testing.config.configProcessors.configProcessors');
goog.setTestOnly();

const {configProcessors} = goog.require('measurementLibrary.config.configProcessors');

describe('After calling the setupMeasure function of setup', () => {
  let dataLayer;
  let helper;
  beforeEach(() => {
    dataLayer = [];
    helper = new DataLayerHelper(dataLayer);
  });

  it('Does not crash when unsupported strings are passed in', () => {
    configProcessors(helper, 'config', 'unusedProcessorName',
        {}, 'unusedStorageName', {});

    expect(dataLayer.length).toBe(0);
  });

  it('Does not crash when non string non constructable' +
      'object is passed', () => {
    configProcessors(helper, 'config', new Date(), {}, [1, 2, 3], {});

    expect(dataLayer.length).toBe(0);
  });
});
