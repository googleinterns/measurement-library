goog.module('measurementLibrary.testing.config.configProcessors.registerEventAndSet');
goog.setTestOnly();
const {registerEventAndSet_} = goog.require('measurementLibrary.config.configProcessors');
const DataLayerHelper = goog.require('dataLayerHelper.helper.DataLayerHelper');

describe('the behavior after a call to save', () => {
  let measure;
  let helper;
  let processor;
  let storage;

  beforeEach(() => {
    const dataLayer = [];
    measure = function() {
      dataLayer.push(arguments);
    };
    helper = new DataLayerHelper(dataLayer);
    processor = jasmine.createSpyObj('processor',
        ['persistTime', 'processEvent']);
    storage = jasmine.createSpyObj('storage', ['load', 'save']);
    registerEventAndSet_(helper, processor, {}, storage);
  });

  it('calls persistTime once with parameters key, value', () => {
    measure('set', 'a key', 3);

    expect(processor.persistTime).toHaveBeenCalledTimes(1);
    expect(processor.persistTime).toHaveBeenCalledWith('a key', 3);
  });

  it('calls save on the storage interface if persistTime returns' +
      'a positive integer', () => {
    processor.persistTime.and.returnValue(1337);
    measure('set', 'key', 'value');

    expect(storage.save).toHaveBeenCalledTimes(1);
    expect(storage.save).toHaveBeenCalledWith('key', 'value', 1337);
  });

  it('calls save on the storage interface if persistTime returns ' +
      'infinity.',
      () => {
        processor.persistTime.and.returnValue(
                  Number.POSITIVE_INFINITY);
        measure('set', 'key', 'value');

        expect(storage.save).toHaveBeenCalledTimes(1);
        expect(storage.save).toHaveBeenCalledWith(
                  'key', 'value', Number.POSITIVE_INFINITY);
      });

  it('calls save on the storage interface if persistTime returns -1',
      () => {
        processor.persistTime.and.returnValue(-1);
        measure('set', 'a', 'a');

        expect(storage.save).toHaveBeenCalledTimes(1);
        expect(storage.save).toHaveBeenCalledWith('a', 'a');
      });

  it('does not call save on the storage interface if persistTime ' +
      'returns 0', () => {
    processor.persistTime.and.returnValue(0);
    measure('set', 'key', {value: 'ok'});

    expect(storage.save).not.toHaveBeenCalled();
  });

  it('calls save on the storage interface even if persistTime ' +
      'returns 0 when set is passed a positive integer', () => {
    processor.persistTime.and.returnValue(0);
    measure('set', 'key', [1, 2], 213);

    expect(storage.save).toHaveBeenCalledTimes(1);
    expect(storage.save).toHaveBeenCalledWith('key', [1, 2], 213);
  });

  it('does not call save on the storage interface even if ' +
      'persistTime returns -1 when 0 is passed to set', () => {
    processor.persistTime.and.returnValue(-1);
    measure('set', 'productive_function', () => {}, 0);

    expect(storage.save).not.toHaveBeenCalled();
  });
});
