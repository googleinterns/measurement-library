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

# Overview
Measurement Library is a utility to help developers send data collected from their website to
other libraries for analytics. After specifying settings in a script tag, you can process any
sent events using a variety of built in event processors (e.g. sending data to Google Analytics).

Data from events or generated by event processors is automatically saved to persist between visits using your choice of
a variety of different storage options (e.g. cookies). [Read the docs](https://googleinterns.github.io/measurement-library/#) to learn more.

# Installation
First, install the package with your favorite package manager:
```bash
yarn add measurement-library
// or
npm install measurement-library
```

Next, choose [the event processor](https://googleinterns.github.io/measurement-library/#EventProcessors) and 
[the storage implementation]((https://googleinterns.github.io/measurement-library/#StorageInterfaces))
to use and include this code in your `<head>` tag. It should be placed as high up in the block as possible
in order to catch users who leave immediately after loading the page, then immediately leave.
```html
<!-- Measurement Library Snippet -->
<script async src="./node_modules/measurement-library/dist/measure"/>
<script>
  window.dataLayer = window.dataLayer || [];
  function measure(){dataLayer.push(arguments);}
  // One or more config commands. To send data to google analytics while
  // using cookies for storage:
  measure('config', 'googleAnalytics', {
    'measurement_id': YOUR_MEASUREMENT_ID,
    'api_secret': YOUR_API_SECRET,
  }, 'cookies', {});
</script>
```

As an alternative, you can use the development version when testing your page. The dev version has a bigger file size,
but reports possible errors to the console.
```html
<!-- Measurement Library Snippet (Development Version) -->
<script async src="./node_modules/measurement-library/dist/measure-debug"/>
<script>/* Configure script like last example. */ </script>
```

# Usage
After setting up the script tag using the `config` command, you can begin to use the library. All commands
are processed by passing arguments to the `measure()` function. 


## Event command
When you run the command `measure('event', eventName, eventOptions)`, all registered
[event processors](https://googleinterns.github.io/measurement-library/#EventProcessors) will read the event and perform actions corresponding
to their API.

## Set command
To save parameters beyond the current page, you can call the command `measure('set', key, value)`.
The registered event processor will determine if the value should be saved, how long the value should
be saved for, and save it in the corresponding [storage](https://googleinterns.github.io/measurement-library/#StorageInterfaces).
To overwrite this behavior, you can specify a third time-to-live parameter:
`measure('set', key, value, secondsToLive)`. In particular, if `secondsToLive` is 0, no data will be saved to long term storage.
