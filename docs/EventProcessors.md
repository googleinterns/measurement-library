# Event Processors
## Google Analytics
 [//]: # (TODO: kj)

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

