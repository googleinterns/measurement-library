# Demo Website

The demo website to show features of the measure library.
This site fires actual gtag and measure library events, and
displays the code for them.

# Deploying the app locally

To run the app locally, navigate to this /demo directory and
then type the following commands in the console.

```shell script
yarn install
yarn local
```

To deploy the app, ensure you have the [Cloud SDK](https://cloud.google.com/sdk/install) installed and
then type the following commands in the console.

```shell script
yarn build
gcloud app deploy
```
