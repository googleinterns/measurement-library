# Measurement Library

Measurement library will provide an open source alternative for sites/apps to send events to Google Analytics.

**This is not an officially supported Google product.**


[![Build Status](https://travis-ci.org/googleinterns/measurement-library.svg?branch=master)](https://travis-ci.org/github/googleinterns/measurement-library/branches)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)

## Table of contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
    - [Event Command](#event-command)
    - [Set Command](#set-command)
- [Event Processors](#event-processors)
    - [Google Analytics](#google-analytics)
    - [Custom Event Processor](#custom-event-processor)
- [Storage Interfaces](#storage-interfaces)
    - [Cookies](#cookies)
    - [Custom Storage Interface](#custom-storage-interface)
- [Local Setup](#local-setup)
    - [Creating the build](#creating-the-build)
    - [Running Tests Interactively](#running-tests-interactively)

# Overview
Measurement Library is a utility to help developers send data collected from their website to
other libraries for analytics. After specifying settings in a script tag, you can process any
sent events using a variety of built in event processors (e.g. sending data to Google Analytics).

Data about the user is automatically saved to persist between visits using your choice of
a variety of different storage options (e.g. cookies).

# Installation
First, install the package with your favorite package manager:
```bash
yarn add measurement-library
// or
npm install measurement-library
```

Next, choose [the event processor](#event-processors) and [the storage implementation](#storage-interfaces)
that you want to use and include this code in your `<head>` tag.
```html
<script async src="./node_modules/measurement-library/dist/measure"/>
<script>
  window.dataLayer = window.dataLayer || [];
  function measure(){dataLayer.push(arguments);}
  // One or more config commands. To send data to google analytics while 
  // using cookies for storage:
  measure('config', 'googleAnalytics', {}, 'cookies', {});
</script>
```

[//]: # (TODO: kj Make the config command use the right settings for google analytics)

For the development version (bigger file size, but reports possible errors to the console):
```html
<script async src="./node_modules/measurement-library/dist/measure-debug"/>
<script>/* Configure script like last example. */ </script>
```

# Usage
After setting up the script tags, you can begin to use the library. All commands
are processed by passing arguments to the  `measure()` function. 

## Event command
When you run the command `measure('event', eventName, eventArgs)`, all registered
[event processors](#event-processors) will read the event and perform actions corresponding
to their API.

## Set command
To save parameters beyond the current page, you can call the command `measure('set', key, value)`.
The registered event processor will determine if the value should be saved, how long the value should
be saved for, and save it. To overwrite this behavior, you can specify a third time-to-live parameter:
`measure('set', key, value, secondsToLive)`. In particular, if `secondsToLive` is 0, no data will be saved
to long term storage.

The set command can also be used to set parameters related to a implementation of
an event processor or storage interface. For example, to modify the default parameters
of the cookies storage, run a `set` command in the script tag before calling
`config`. 

```js
measure('set', 'cookies', {prefix: 'my_', expires: 11});
// Configure the cookies storage with prefix 'my_' and expires 22.
measure('config', 'eventProcessorName', {}, 'cookies', {expires: 22});
// Configure another cookies storage with prefix 'my_' and expires 11.
measure('config', 'eventProcessorName', {}, 'cookies', {});
```

# Event Processors
## Google Analytics
 [//]: # (TODO: kj)

## Custom Event Processor
If none of the above fit your needs, you can create your own event processor.
An event processor is a class with the 2 methods described in [eventProcessorInterface.js](/src/eventProcessor/EventProcessorInterface.js)
in addition to a constructor that takes an options object as it's only parameter.

```html
<script async src="./node_modules/measurement-library/dist/measure"/>
<script>
    window.dataLayer = window.dataLayer || [];
    function measure(){dataLayer.push(arguments);}
    class MyProcessor {
      constructor({theNumber});
      processEvent(storageInterface, modelInterface, eventName, eventArgs);
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

# Storage Interfaces
## Cookies
 [//]: # (TODO: pedro)

## Custom Storage Interface
If none of the above fit your needs, you can create your own storage interface.
A storage interface is a class with the 2 methods described in [storageInterface.js](/src/storage/StorageInterface.js)
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
    measure(config, 'google_analytics', {}, MyStorage, {theNumber: 42});
    // Call the save command with secondsToLive determined by the persistTime
   // function of the event processor.
    measure('set', 'key', 'value');
</script>
```

# Local Setup
## Creating The Build
You will need to have either [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
or [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) installed.

First, install dependencies with yarn or npm
```shell script
yarn install
# or
npm install
```

Next, run the tests using yarn or npm:

```shell script
yarn test
# or
npm run test
```

## Running Tests Interactively
You can also run the tests "interactively" via Karma directly.

```shell script
yarn unit
# or
npm run unit
```

To run the integration tests instead of the unit tests,

```shell script
yarn integration
# or
npm run integration
```
