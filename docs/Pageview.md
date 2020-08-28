# Pageview
Almost any analytics software will have some way to measure page view events. This page
gives an example of how to send a pageview event.

First, configure the processor on your [page.](https://googleinterns.github.io/measurement-library/#/?id=installation)

For this example, let's choose the google analytics processor to configure.
```js
measure('config', 'googleAnalytics', {
  'measurement_id': YOUR_MEASUREMENT_ID,
  'api_secret': YOUR_API_SECRET,
}, 'cookies', {});
```

Then, when you change to a new page, send a pageview event. You can optionally send parameters like the
page title, location, and path.
```js
measure('event', 'page_view', {
  page_title: 'Prints of Poe',
  page_path: 'http://measurement-library.appspot.com/',
  page_location: '/',
});
```

If you are an application that refreshes with each page change, you can just add this line to the measure snippet.
Otherwise, an event must be sent each time that the page is changed. Here are some ways to an event on page change using popular libraries.

<!-- tabs:start -->
#### ** React **
One way to accomplish this in react is to use the history variable of a router.
We can use the history variable passed to a router component in our react application to track when a pageview happens.
We use the withRouter function to route our application between a home and about screen.
Then, the useEffect hook registers a function that fires when the history changes.

```js
import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
function RouterBase({history}) {
  useEffect(() => {
    // Sends the first page view.
    sendPageView(history.location);
    // subscribes to future page changes.
    history.listen(sendPageView);
  }, [history]);

  const sendPageView = (location) => {
    window.measure('event', 'page_view', {
      page_title: 'Demo Site',
      page_path: location.pathname,
     });
     console.log(`Sent page view at ${location.pathname}`)
  };

  return (
    <Switch>
      <Route path="/about">
        <h1>The about screen</h1>
      </Route>
      <Route path="/">
        <h1>The home screen</h1>
      </Route>
    </Switch>
  );
}

export const Router = withRouter(RouterBase);
```

[Full demo](https://stackblitz.com/edit/react-7gyfv7)

#### ** Angular **
In angular, a common technique is to use the RouterModule component to navigate
your app. First, use the router module service with all of your pages.
```js
import { RouterModule } from '@angular/router';

imports: [RouterModule.forRoot([
  { path: '', component: HelloComponent },
  { path: 'about', component: AboutComponent },
  ])],
```

We can subscribe to a router service when our main app
is loaded by using the `router.events.subscribe` function.
```js
constructor(private router: Router, private activatedRouter: ActivatedRoute){}
ngOnInit(){
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart){
      window["measure"]('event', 'page_view', {
        page_title: 'Demo Site',
        page_path: event.url,
      });
      console.log(event);
    }
  })
}
```
[Full demo](https://angular-ivy-uogmce.stackblitz.io)

<!-- tabs:end -->
