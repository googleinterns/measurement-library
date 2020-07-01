# Measurement Library

Measurement library will provide an open source alternative for sites/apps to send events to Google Analytics.

**This is not an officially supported Google product.**

# Running tests locally

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
You can also run the tests "interactively" via Karma directly. Add Karma to your path if it isn't already:

```shell script
yarn global add karma-cli
# or
npm install -g karma-cli
```

Next, run the tests with karma

```shell script
karma start
```