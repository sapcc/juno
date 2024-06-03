# Example App

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

The example app serves as a demonstration application where we thoroughly test and implement interactions between multiple components following our best practices. Additionally, it functions as a prime illustration of how Juno components can be effectively utilized.

# Usage

## Standalone

To integrate the Microfrontend as a standalone module, follow these steps:

1. Include the following script tag in your HTML file:

```js
<script type="module">
  import("URL_TO_MODULE_JS_FILE").then((app) =>
    app.mount(document.getElementById("root"), {
      props: { /* SOME PROPS*/ }
    })
  )
</script>
```

2. Place a div element with the id "root" where you want the Microfrontend to be rendered:

```html
<div id="root" data-juno-app="exampleapp"></div>
```

## Embedded

1. To embed the React Microfrontend into your application, start by installing it:

```bash
npm add @sapcc/juno-app-exampleapp"
```

2. Next, import and integrate it into your code:

```js
import Exampleapp from "@sapcc/juno-app-exampleapp"

const App = () => {
  /*...*/
  return (
    <div>
      <Exampleapp />
    </div>
  )
}
```

Or using React's lazy loading to keep the bundle size small

```js
import { lazy } from "react"

const Exampleapp = lazy(() => import("@sapcc/juno-app-exampleapp"))

const App = () => {
  /*...*/
  return (
    <div>
      <Exampleapp />
    </div>
  )
}
```

# Best practices

- [React Zustand] implementation with React context
- [React Zustand] store sliced and structured in lib folder.
- [React Zustand] [Avoid Rerenders] Zustand export single States instead of the whole Store.
- [React Query] [Avoid Rerenders] Use of hook `useQueryClilentFn` isolated in AsyncWorker component.
- [React Query] use of hook `useQueryClilentFn` to encapsulate all queries and react to changes.
- [Avoid Rerenders] use of hook `useUrlState` instead isolated in AsyncWorker component.
- [Coworking Experience] use of hook `useUrlState` without boiler plate.
- [Enhance Rendering Experience] Use of hook `useEndlessScrollList`.
- [Coworking Experience] Components splitted in contexts.
- Use of fetchLocal to simulate a local db.

```

```
