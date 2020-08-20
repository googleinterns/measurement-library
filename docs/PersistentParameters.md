# Persistent Parameters
## Sharing Constructor Arguments
If you have many storage interfaces on the page that should have the same settings,
you can call the `set` command before calling the `config` command to share parameters automatically,
passing in the name of the storage interface as the first argument to `set`. 

```js
// Set the default cookie parameters
measure('set', 'cookies', {prefix: 'my_', expires: 11});
// Use the default cookie parameters: prefix 'my_' and expires 11.
measure('config', 'googleAnalytics', {}, 'cookies', {});
// Override a default cookie parameter: expires is 22 for this storage.
measure('config', 'googleAnalytics', {}, 'cookies', {expires: 22});
```

Since custom storage interfaces do not have a name, to enable the behavior of shared arguments for a custom object,
you must implement the static getName() method, returning the string that should be passed as the first argument
to set.

The example above used a storage interface, but it works exactly the same for an event processor. However,
with event processors, you should think of the set command and constructor arguments as a way to share
event options between processors, as detailed in the next section.

## Sharing Event Options
If you have many processors on a page that should share several event options, then calling
`measure('set','processorType', persistingOptions)` will set parameters that persist from each
call to `measure('event', eventName, eventOptions)`.
To distinguish between multiple processors of the same type, parameters set in the `measure(config, ...)`
command will override these values. Additionally, any parameters set in `eventOptions` will override the other 2.
Note that the order that you call config or set in does not matter - either order produces the same
result.

```js
// Set the default parameters.
// Call the constructor with {}
measure('config', 'googleAnalytics', {}, 'cookies', {});
measure('set', 'googleAnalytics', {animal: 'dog', color: 'red'});
// Call the constructor with {currency: 'USD', animal: 'cat', color: 'blue'}
measure('config', 'googleAnalytics', {currency: 'USD', animal: 'cat', color: 'blue'}, 'cookies', {});
// The first processor sees the eventOptions parameter as
//     {animal: 'dog', color: 'green'}
// The second processor sees the eventOptions parameter as
//     {currency: 'USD', animal: 'cat', color: 'green'}
measure('event', 'name', {color: 'green'});
```
So the set command will add arguments to both the constructor and every event, and the constructor
will also add arguments to every event.

### Edge cases
When overwriting data, values are shallow-copied, so the first value is overwritten in the next example
```js
// The default parameters are {options: {a: 1}}
measure('set', 'googleAnalytics', {options: {a: 1}});
// The default parameters are {options: {b: 2}}, not {options: {a: 1, b: 2}}
measure('set', 'googleAnalytics', {options: {b:'2'}});
```
