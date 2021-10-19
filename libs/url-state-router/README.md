# URL State Router

React ONLY!!!

If you already know the [React-Router](https://reactrouter.com) and you are wondering how you can use something similar in **micro frontends**, then you have come to the right place!

Problem: Multiple routers on one page (SPA).

Solution: URL-State-Router.

The idea of the URL State Router is based heavily on the [React-Router](https://reactrouter.com/). However, the URL-State-Router pursues the use case to enable multiple routers on a single page.

This is achieved by combining the paths from several routers and managing them as search param in the URL. Each URL state router registers itself with a unique key (stateID) in the global state (part of [url-state-provider]()) and receives functions to update the state such as **push** and **replace** or **onChange** in order to react to changes in the URL . The synchronization and mapping of the state to the URL and back is done by the [url-state-provider]().

```js
import { Router, Route, Switch, Redirect, Link } from "url-state-router"

const App = () => {
  return (
    <Router stateID="app1">
      <Route exact path="/">
        <Redirect to="/items" />
      </Route>
      <Route path="/items">
        <Link to="/items/new">Create Item</Link>
        <Link to="/items/10">Go to Item 10</Link>
      </Route>
      <Switch>
        <Route path="/items/new">New Item</Route>
        <Route path="/items/:id">Item Details</Route>
      </Switch>
    </Router>
  )
}
```

## Router

Router is the main component in which all other components live.
In principle it is a context provider. Immediately after mounting, this component registers itself with the [url-state-provider]() with the given **stateID** and sets the context variables:

- currentPath, intial it is the state from the URL or "/"
- options, path options like { tab: 2 }
- navigateTo, function, which receives the path and options as parameters
- redirectTo, similar to navigateTo with the difference that the window history does not get a new entry, but the last URL is replaced.

## Route

## Redirect

## Switch

## Link

## useRouter
