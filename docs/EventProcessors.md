# Event Processors
When `measure('event', 'eventName', eventOptions)` is called, every configured event processor will be given a
chance to react to that event with the given options. They can also interact with the storage by overriding the
default time to live for specific keys.

Event processors may perform actions such as sending a network request based on the event data, interacting with
the storage interface to commit and retrieve values from long-term storage, or reading values from the abstract model.

## Google Analytics
To configure the Google Analytics event processor, constructor arguments can be passed in via the [code snippet](#installation).

The supported constructor arguments are:
* `api_secret`: The Google Analytics API Secret. The API secret can be generated via Google Analytics UI. Required when using the default measurement URL. If included, it will be added as a query parameter.
* `measurement_id`: The Google Analytics measurement ID of the property to be measured. Can be found via Google Analytics UI. Required when using the default measurement URL.
* `measurement_url`: URL endpoint to send events to. Defaults to Google Analytics collection endpoint. Optional. If overridden, the developer will need to ensure the URL forwards events to Google Analytics.
* `client_id_expires`: Time in seconds to store the client ID in long term storage. Defaults to two years. Optional.
* `automatic_params`: Array of event parameters that will be searched for in the global data model and pulled into all events if found. Optional.

A basic example:

```js
measure(
  'config',
  'googleAnalytics',
  {
    'measurement_id': YOUR_MEASUREMENT_ID,
    'api_secret': YOUR_API_SECRET,
  },
  'cookies',
  {}
);
```

Events are processed and sent to Google Analytics using the [event command](#event-command).
A complete description of events that can be sent is described in the [gtag documentation.](https://developers.google.com/analytics/devguides/collection/gtagjs/pages) 
You will need to replace the call `gtag('event', ...)` with `measure('event', ...)`.

For a simple page view event with some supporting data, developers can call:

```js
measure('event', 'page_view', {
  'page_title': 'Example Title',
  'page_path': '/example',
});
```

This will send a `page_view` event to Google Analytics with the event parameters provided. In addition
to the event level parameters provided, developers can set event parameters using the [set command](#set-command) that will
then be included in the event sent to Google Analytics even if not explicitly provided in the event command.

For example, to set the currency to USD for  all Google Analytics event processors:

```js
measure('set', 'googleAnalytics', {
  'currency': 'USD',
});
```

All future event calls will now send the currency event parameter with the value USD. This behavior can be overridden
at the event level as more specific parameters take priority. For instance, the following event sets currency
to CAD instead of the previously set USD.

```js
measure('event', 'purchase', {
  'value': 99,
  'currency': 'CAD',
});
```

In addition to this, the global data model can be used to share event parameters. The global data model contains all the
key value pairs stored with the [set command](#set-command) when called without relation to a storage or event processor.

```js
measure('set', 'example_param', 'example_value');
```

If you would like to retrieve and send this parameter with all Google Analytics events after setting it,
you would configure your code snippet to look like the following:

```js
measure(
  'config',
  'googleAnalytics',
  {
    'measurement_id': YOUR_MEASUREMENT_ID,
    'api_secret': YOUR_API_SECRET,
    'automatic_params': ['example_param'],
  },
  'cookies',
  {}
);
```

Client ID is a parameter that is stored globally and included in the automatic parameters list by default. The event
processor generates a new client ID when one is not found in the long term storage and persists this client ID so
that each event can be tied to a specific client. By default the client ID will be generated and stored for two years,
though this can be changed via the `client_id_expires` constructor argument.

We encourage developers to let the event processor generate client IDs instead of providing them themselves. 
The `userId` global key is also a global automatic parameter that can be used to identify unique users across processors.

To do so, just set the user ID:
```js
measure('set', 'userId', 'YOUR_USER_ID');
```

The other automatic parameters that are searched for and can be set globally are: `page_path`, `page_location`, and `page_title`.
Global parameters are considered as being the least specific and will be overridden by parameters of the same name that are set
at the `googleAnalytics` level or sent at event command level.

## Custom Event Processor
If none of the built-in processors fit your needs, you can create your own event processor.
An event processor is a class with the 2 methods described in [eventProcessorInterface.js](/src/eventProcessor/EventProcessorInterface.js)
in addition to a constructor that takes an options object as it's only parameter.

```html
<script async src="./node_modules/measurement-library/dist/measure"/>
<script>
    window.dataLayer = window.dataLayer || [];
    function measure(){dataLayer.push(arguments);}
    class MyProcessor {
      constructor({theNumber});
      processEvent(storageInterface, modelInterface, eventName, eventOptions);
      persistTime(key, value);
    }
    // Call the class constructor  
    measure(config, myProcessor, {theNumber: 42}, 'cookies', {});
    // Calls the processEvent function with parameters 
    // (cookies storage, short term storage, 'jump', {height: 6}).
    measure('event', 'jump', {height: 6})
    // Sets a value in the storage with secondsToLive determined by
    // the persistTime function of the event processor.
    measure('set', 'key', 'value');
</script>
```

