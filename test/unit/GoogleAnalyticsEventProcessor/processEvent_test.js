goog.module('measurementLibrary.testing.eventProcessor.GoogleAnalyticsEventProcessor.processEvent');
goog.setTestOnly();

const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');
const logging = goog.require('measurementLibrary.logging');
const {MockStorage, MockModelInterface} = goog.require('measurementLibrary.testing.mocks');

describe('The `processEvent` method ' +
    'of GoogleAnalyticsEventProcessor', () => {
  const currentDebug = logging.DEBUG;
  let eventProcessor;
  const emptyStorage = new MockStorage();
  const emptyModel = new MockModelInterface({});

  describe('when debug mode is enabled', () => {
    beforeEach(() => {
      logging.DEBUG = true;
      eventProcessor = new GoogleAnalyticsEventProcessor();
      eventProcessor.buildRequestUrl_ = () => 'mock_request_url';
      eventProcessor.getClientId_ = () => 'mock_client_id';

      jasmine.Ajax.install();
    });

    it('logs request response to console', () => {
      spyOn(logging, 'log');
      eventProcessor.processEvent(
        emptyStorage,
        emptyModel,
        'test',
        {});

      jasmine.Ajax.requests.mostRecent().respondWith({
        responseText: 'test response',
      });

      expect(logging.log).toHaveBeenCalledTimes(1);
      expect(logging.log)
          .toHaveBeenCalledWith('test response', logging.LogLevel.INFO);
    });

    afterEach(() => {
      logging.DEBUG = currentDebug;
      jasmine.Ajax.uninstall();
    });
  });

  describe('the XMLHttpRequest request', () => {
    beforeEach(() => {
      eventProcessor = new GoogleAnalyticsEventProcessor({
        automatic_params: ['added_param', 'non_personalized_ads'],
      });
      eventProcessor.buildRequestUrl_ = () => 'mock_request_url';
      eventProcessor.getClientId_ = () => 'mock_client_id';

      jasmine.Ajax.install();
      jasmine.Ajax.addCustomParamParser({
        test: () => true,
        parse: (data) => {
          return JSON.parse(data);
        },
      });
    });

    it('sends via POST', () => {
      eventProcessor.processEvent(
        emptyStorage,
        emptyModel,
        'test',
        {});

      expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
    });

    it('has the request url built by the event processor', () => {
      eventProcessor.processEvent(
        emptyStorage,
        emptyModel,
        'test',
        {});

      expect(jasmine.Ajax.requests.mostRecent().url).toBe('mock_request_url');
    });

    it('includes the client ID retrieved by event processor', () => {
      eventProcessor.processEvent(
        emptyStorage,
        emptyModel,
        'test',
        {});

      expect(jasmine.Ajax.requests.mostRecent().data().clientId)
          .toBe('mock_client_id');
    });

    it('creates a single event within the events array', () => {
      eventProcessor.processEvent(
        emptyStorage,
        emptyModel,
        'test',
        {});

      expect(jasmine.Ajax.requests.mostRecent().data().events.length)
          .toBe(1);
    });

    it('adds the event name to the single event', () => {
      eventProcessor.processEvent(
        emptyStorage,
        emptyModel,
        'test',
        {});

      expect(jasmine.Ajax.requests.mostRecent().data().events[0].name)
          .toBe('test');
    });

    it('has no event parameters when both model and eventOptions ' +
        'are empty', () => {
      eventProcessor.processEvent(
        emptyStorage,
        emptyModel,
        'test',
        {});

      expect(jasmine.Ajax.requests.mostRecent().data().events[0].params)
          .toEqual({});
    });

    it('has all event parameters passed in via eventOptions ' +
        'that are defined', () => {
      const eventOptions = {
        param_one: 1,
        param_two: '2',
        param_three: null,
        param_four: {
          param_five: true,
        },
        param_six: ['test'],
        param_seven: false,
      };

      eventProcessor.processEvent(
        emptyStorage,
        emptyModel,
        'test',
        eventOptions);

      expect(jasmine.Ajax.requests.mostRecent().data().events[0].params)
          .toEqual(eventOptions);
    });

    it('has event level global values when key is defined in model and ' +
        'is included in default automatic parameter list', () => {
      eventProcessor.processEvent(
        emptyStorage,
        new MockModelInterface({
          page_path: 'model_page_path',
        }),
        'test',
        {});

      expect(
        jasmine.Ajax.requests.mostRecent().data().events[0].params.page_path
      ).toBe('model_page_path');
    });

    it('has event level global values when key is defined in model and ' +
        'is added to automatic parameter list', () => {
      eventProcessor.processEvent(
        emptyStorage,
        new MockModelInterface({
          added_param: 'model_added_param',
        }),
        'test',
        {});

      expect(
        jasmine.Ajax.requests.mostRecent().data().events[0].params.added_param
      ).toBe('model_added_param');
    });

    it('has top level global values when key is defined in model and ' +
        'is included in default automatic parameter list', () => {
      eventProcessor.processEvent(
        emptyStorage,
        new MockModelInterface({
          userId: 'model_user_id',
        }),
        'test',
        {});

      expect(jasmine.Ajax.requests.mostRecent().data().userId)
          .toBe('model_user_id');
    });

    it('has top level global values when key is defined in model and ' +
        'is added to automatic parameter list', () => {
      eventProcessor.processEvent(
        emptyStorage,
        new MockModelInterface({
          non_personalized_ads: 'model_non_personalized_ads',
        }),
        'test',
        {});

      expect(jasmine.Ajax.requests.mostRecent().data().nonPersonalizedAds)
          .toBe('model_non_personalized_ads');
    });

    it('overrides event level global values when key is defined ' +
        'in eventOptions', () => {
      const eventOptions = {
        page_path: 'overriden_page_path',
      };

      eventProcessor.processEvent(
        emptyStorage,
        new MockModelInterface({
          page_path: 'model_page_path',
        }),
        'test',
        eventOptions);

      expect(
        jasmine.Ajax.requests.mostRecent().data().events[0].params.page_path
      ).toBe('overriden_page_path');
    });

    it('does not override event level global value if key is undefined ' +
        'in eventOptions', () => {
      const eventOptions = {
        page_path: undefined,
      };

      eventProcessor.processEvent(
        emptyStorage,
        new MockModelInterface({
          page_path: 'model_page_path',
        }),
        'test',
        eventOptions);

      expect(
        jasmine.Ajax.requests.mostRecent().data().events[0].params.page_path
      ).toBe('model_page_path');
    });

    it('overrides top level global values when key is defined ' +
        'in eventOptions', () => {
      const eventOptions = {
        user_id: 'overriden_user_id',
      };

      eventProcessor.processEvent(
        emptyStorage,
        new MockModelInterface({
          userId: 'model_user_id',
        }),
        'test',
        eventOptions);

      expect(jasmine.Ajax.requests.mostRecent().data().userId)
          .toBe('overriden_user_id');
    });

    it('does not override top level global value if key is undefined ' +
        'in eventOptions', () => {
      const eventOptions = {
        userId: undefined,
      };

      eventProcessor.processEvent(
        emptyStorage,
        new MockModelInterface({
          userId: 'model_user_id',
        }),
        'test',
        eventOptions);

      expect(jasmine.Ajax.requests.mostRecent().data().userId)
          .toBe('model_user_id');
    });

    it('overrides client ID when defined in eventOptions', () => {
      const eventOptions = {
        client_id: 'overriden_client_id',
      };

      eventProcessor.processEvent(
        emptyStorage,
        emptyModel,
        'test',
        eventOptions);

      expect(jasmine.Ajax.requests.mostRecent().data().clientId)
          .toBe('overriden_client_id');
    });

    it('does not override client ID when undefined in eventOptions', () => {
      const eventOptions = {
        clientId: undefined,
      };

      eventProcessor.processEvent(
        emptyStorage,
        emptyModel,
        'test',
        eventOptions);

      expect(jasmine.Ajax.requests.mostRecent().data().clientId)
          .toBe('mock_client_id');
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
    });
  });
});
