# URL State Provider

Manage multiple states in the URL.

This module was originally developed for use in Micro Frontends (MFEs). In our projects we have had larger MFEs, each of which implemented several views. The navigation between these views should be managed with the help of the address bar in the browser. This should also enable deep links.

URL State Provider does nothing more than manage a global state and synchronize that state with the URL. Each application can use the `push` function, which requires an unique key, to save its own state in the global state. Whenever the global state changes, a specific search parameter in the URL is updated immediately. And vice versa, every change in the URL has an immediate effect on the global state.

## Usage

Low level

```js
import urlStateProvider from "url-state-provider"

// Add a listener for changes on URL for the state of app1
// The callback function is always executed when the state for app1 changes.
// The status changes if, for example, a new status is pushed from the
// app or if the user clicks the back and forward buttons in browser.
urlStateProvider.addOnChangeListener("app1", (newState) => {
  console.log(newState)
})

// get initial state for app1 from URL (initial page URL)
urlStateProvider.currentState("app1")

// add a new URL to the history object
urlStatusProvider.push("app1", { p: "/items" })
// replace last URL with a new one
urlStatusProvider.replace("app1", { p: "/items/new" })

// unregister listener
urlStateProvider.removeOnChangeListener("app1")
```

High level

```js
import urlStateProvider from "url-state-provider"

var consumer2 = urlStateProvider.registerConsumer("app2")

var unregisterConsumer2 = consumer2.onChange((newState) =>
  console.log(newState)
)

consumer2.currentState()
consumer2.push({ p: "/items" })
consumer2.replace({ p: "/items/new" })

unregisterConsumer2()
```
