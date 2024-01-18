# Widget Loader

The Widget Loader streamlines the efficient loading of diverse applications. It initiates the process by loading an import map, serving as a comprehensive repository of dependencies for all assets. This import map is a collection of key-value pairs, where keys represent package names, and corresponding values indicate URLs leading to the package sources. It lays the foundation for subsequent loading steps, ensuring the runtime availability of all dependencies and enabling multiple applications to efficiently share libraries.

## Usage

Load a asset via script tag as follows:

```js
<script
  defer
  src="https://assets.JUNO_HOSTNAME/apps/widget-loader@VERSION/build/app.js"
  data-name="auth"
  data-version="VERSION"
></script>
```

Example:

```js
<script
  defer
  src="https://assets.juno.global.cloud.sap/apps/widget-loader@latest/build/app.js"
  data-name="whois"
  data-version="1.x"
></script>
```

### HTML Template

```html
<!DOCTYPE html>
<html style="height: 100vh; background: rgb(13, 20, 28);">
  <head>
    <title>App</title>
    <link
      rel="icon"
      href="https://assets.juno.global.cloud.sap/assets/favicon.ico"
    />
  </head>
  <body style="height: 100vh;">
    <script
      defer
      src="https://assets.juno.global.cloud.sap/apps/widget-loader@latest/build/app.js"
      data-name="APP_NAME"
      data-version="latest"
    ></script>
  </body>
</html>
```

replace APP_NAME with your app name, e.g. whois

## Options

- `data-url` (required unless data-name is provided) an absolute URL to the asset. If this option is used, `data-version` and `data-name` are ignored

- `data-name` (required unless data-url is provided) name of the asset to be loaded. If you use this option without `data-url`

- `data-version (default is "latest")`: Specifies the version of the asset, supporting semantic versioning (semver) for more granular control over updates. If not explicitly provided, the default is set to the latest available version.

- `data-origin` (optinal) assets host URL, e.g. https://assets.juno.qa-de-1.cloud.sap

- `data-debug` (default is false) log debug infos to console (default is false)

- `data-show-loading` (default is false) show "Loading..." while content is being loaded

- `data-importmap-url` (optional) URL of the importmap (default is https://ORIGIN/importmap.json)

- `data-importmap-only` (optional) if true then only the importmap is loaded, all other props except importmap-url and debug are ignored

- `data-props-NAME` using this option you can provide any prop to the asset.
  - Example: `data-props-color="green"`
  - Example: `data-props-clientID="abc"` will map to "clientid"

> :warning: **Please only use lower case and avoid special characters when difining the NAME**

## Load External Assets

External assets are loaded by specifying the data-url option. However, the asset must implement the widget interface.

`async function mount (container, options = {}) -> Promise`
`function unmount ()`

**Params**

- container `object` - DOM element
- options `object` - a key value map

**Returns**: `object` the App component

Example (React):

```js
//index.js
import { createRoot } from "react-dom/client"
import React from "react"

// export mount and unmount functions
export const mount = async (container, options = {}) => {
  return import("./App").then((App) => {
    mount.root = createRoot(container)
    mount.root.render(React.createElement(App.default, options?.props))
  })
}

export const unmount = () => mount.root && mount.root.unmount()
```

### Best Practise

1. exclude packages like react, react-dom, zustand ect. from bundle

- in esbuild use `external: []`
- in webpack `externals: {}`

Example:

```js
// webpack.config.js
  // ...
  entry: path.resolve(__dirname, "src/inndex.js"),
  //Where we put the production code
  output: {
    path: path.resolve(__dirname, "build"),
    // main file
    "index.js",
    // async chunks which are imported asynchronous "import('...').then(...)"
    chunkFilename: "[contenthash].js",
    // result as esm
    library: { type: "module" },
    // expose files imported asynchronous as chunks
    asyncChunks: true,
    clean: true,
  },
  externalsType: "module",
  externals: {"react": "react", "react-dom": "react-dom"},
  //...
```

2. create two files:

`index.js`

```js
import { createRoot } from "react-dom/client"
import React from "react"

// export mount and unmount functions
export const mount = async (container, options = {}) => {
  return import("./App").then((App) => {
    mount.root = createRoot(container)
    mount.root.render(React.createElement(App.default, options?.props))
  })
}

export const unmount = () => mount.root && mount.root.unmount()
```

`App.jsx`

```jsx
import React from "reat"

const App = ({}) => {
  return <div>My App</div>
}

export default App
```
