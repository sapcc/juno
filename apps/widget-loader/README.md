# Widget Loader

The Widget Loader enables every Micro Frontend (MFE) provided by Juno to be loaded. External MFEs can also be embeded with the help of this loader if they implement the corresponding interface (see below).

## Usage

Load a MFE via script tag as follows:

```js
<script
  defer
  src="https://JUNO_HOSTNAME/cdn/widget-loader/VERSION/app.js"
  data-name="auth"
  data-version="MFE_VERSION"
></script>
```

Example:

```js
<script
  defer
  src="https://juno.global.cloud.sap/cdn/widget-loader/latest/app.js"
  data-name="whois"
  data-version="latest"
></script>
```

## Options

- `data-url` an absolute URL to the MFE. If this option is used, `data-version` is ignored, but `data-name` still has to be specified.

- `data-name` name of the MFE to be loaded. If you use this option without `data-url`, `data-version` is mandatory.

- `data-version` version of the MFE

- `data-scope` exposed component (webpack 5 module federation)

- `data-props-NAME` using this option you can provide any prop to the MFE.
  Example: `data-props-color="green"`

## Load external MFEs

External MFEs are loaded by specifying the data-url option. However, the MFE must implement the widget interface.

`function init(wrapper, props)`

**Params**

- wrapper `object` - DOM element
- props `object` - a key value map

**Returns**: `object` the App component

Example (React):

```js
//bootstrap.js
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

export const init = (wrapper, props) =>
  ReactDOM.render(<App {...props} />, wrapper)

// widget.js
export default (wrapper, props) => {
  import("./bootstrap").then((app) => app.init(wrapper, props))
}
```

### Best Practise

1. use wabpack 5 with Module Federation. This ensures that shared libs are not bundled multiple times.

```js
plugins: [
  // ...
  new ModuleFederationPlugin({
    name: "auth",
    library: { type: "var", name: "auth" },
    filename: "widget.js",
    exposes: {
      // expose each component
      // reference this components via data-scope="App"
      "./App": "./src/App",
      "./widget": "./src/widget",
    },
    shared: ["react", "react-dom"],
  }),
  // ...
],
```

2. create three files:

`bootstrap.js`

```js
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

export const init = (wrapper, props) =>
  ReactDOM.render(<App {...props} />, wrapper)
```

`index.js`

```js
import("./bootstrap").then((app) => app.init(document.getElementById("root")))
```

`widget.js`

```js
export default (wrapper, props) => {
  import("./bootstrap").then((app) => app.init(wrapper, props))
```

## Development

If you run the widget loader locally and want to test whether local widgets are loaded correctly, then use the proxy.

`webpack.config.js`

```js
...
proxy: {
  "/test": {
    target: "http://localhost:4000",
    pathRewrite: { "^/test": "" },
  },
},
...
```

start the local widget as follows

```js
PORT=4000 yarn workspace WIDGET_NAME start
```

In the `public/index.html`

```html
<script
  defer
  src="/app.js"
  data-url="https://juno.ap.workspaces-staging.eu-nl-1.cloud.sap/test/widget.js"
  data-name="whois"
  data-props-name="test"
></script>
```

and finally start the widget loader app

```js
yarn workspace widget-loader start
```
