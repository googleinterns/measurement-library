# Measurement Library

Measurement library will provide an open source alternative for sites/apps to send events to Google Analytics.

**This is not an officially supported Google product.**

# Running tests and creating the build

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
npm test
```

## Running tests interactively
You can also run the tests "interactively" via Karma directly.

```shell script
yarn unit
or
npm unit
```

To run the integration tests instead of the unit tests,

```shell script
yarn integration
or
npm integration
```
