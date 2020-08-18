# Storage Interfaces
## Cookies
 [//]: # (TODO: pedro)

## Custom Storage Interface
If none of the built-in storage systems fit your needs, you can create your own storage interface.
A storage interface is a class with the 2 methods described in [storageInterface.js](https://github.com/googleinterns/measurement-library/blob/master/src/storage/StorageInterface.js)
in addition to a constructor that takes an options object as it's only parameter.

```html
<script async src="./node_modules/measurement-library/dist/measure"/>
<script>
    window.dataLayer = window.dataLayer || [];
    function measure(){dataLayer.push(arguments);}
    class MyStorage {
      constructor({theNumber});
      save(key, value, secondsToLive= 3600*24) {};
      load(key, defaultValue= undefined) {};
    }
    // Call the class constructor.
    measure(config, 'eventProcessorName', {}, MyStorage, {theNumber: 42});
    // Call the save command with secondsToLive determined by the persistTime
    // function of the event processor.
    measure('set', 'key', 'value');
</script>
```

