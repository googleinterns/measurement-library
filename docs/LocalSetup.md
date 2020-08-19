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

