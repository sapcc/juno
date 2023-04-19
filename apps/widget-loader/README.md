# Widget Loader

Widget Loader is a special app used to load other apps. Before the widget loader fetches the desired app, it creates an environment (shell) in which all the libs the widget depends on are available.

So that all dependencies are available at runtime and several apps can share libs, we first load the es-module-shim (https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/ es-module-shims.js). This shim supports import map which is simply a key value map. Where key is the name of the package and value is the URL to the package sources. Such a map is loaded in the second step and finally the app itself. With the help of the import map, the browser knows from where the packages are loaded. Furthermore, packages that are used by several apps are only loaded once and the browser cache ensures that packages are not fetched with every page load.

## Usage

Load a MFE via script tag as follows:

```js
<script
  defer
  src="https://assets.JUNO_HOSTNAME/apps/widget-loader@VERSION/build/app.js"
  data-name="auth"
  data-version="MFE_VERSION"
></script>
```

Example:

```js
<script
  defer
  src="https://assets.juno.global.cloud.sap/apps/widget-loader@latest/build/app.js"
  data-name="whois"
  data-version="latest"
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

- `data-url` (required unless data-name is provided) an absolute URL to the MFE. If this option is used, `data-version` and `data-name` are ignored

- `data-name` (required unless data-url is provided) name of the MFE to be loaded. If you use this option without `data-url`

- `data-version` (default is latest) version of the MFE

- `data-origin` (optinal) assets host URL, e.g. https://assets.juno.qa-de-1.cloud.sap

- `data-debug` (default is false) log debug infos to console (default is false)

- `data-show-loading` (default is false) show "Loading..." while content is being loaded

- `data-importmap-url` (optional) URL of the importmap (default is https://ORIGIN/importmap.json)

- `data-importmap-only` (optional) if true then only the importmap is loaded, all other props except importmap-url and debug are ignored

- `data-props-NAME` using this option you can provide any prop to the MFE.
  - Example: `data-props-color="green"`
  - Example: `data-props-clientID="abc"` will map to "clientid"

> :warning: **Please only use lower case and avoid special characters when difining the NAME**

## Load external MFEs

External MFEs are loaded by specifying the data-url option. However, the MFE must implement the widget interface.

`function mount (container, options = {})`
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
export const mount = (container, options = {}) => {
  import("./App").then((App) => {
    mount.root = createRoot(container)
    mount.root.render(React.createElement(App.default, options?.props))
  })
}

export const unmount = () => mount.root && mount.root.unmount()
```

### Best Practise

1. use wabpack 5 module features

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
export const mount = (container, options = {}) => {
  import("./App").then((App) => {
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

## Development

Use webpack dev server with hot reloading and provide some variables to the html template.

```js
// webpack.config.js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const pkg = require("./package.json")
const testData = require("./public/colors.json")
const outputRegex = /(.+)\/([^/]+)/
const appProps = require("../../helpers/appProps")

if (!pkg.source)
  throw new Error(
    'No source found in package.json. Please add "source": "src/index.js" to package.json'
  )

if (!outputRegex.test(pkg.module))
  throw new Error(
    'package.json: module not found or its format does not match "DIR/FILE.js"'
  )

const [_, buildDir, filename] = pkg.module.match(outputRegex)
const externals = {}
for (let key in pkg.peerDependencies) externals[key] = key

module.exports = (_, argv) => {
  const mode = argv.mode
  const isDevelopment = mode === "development"
  const IGNORE_EXTERNALS = process.env.IGNORE_EXTERNALS === "true"

  return {
    experiments: {
      outputModule: true,
    },

    devtool: isDevelopment && "source-map",
    //Where we put the production code
    entry: path.resolve(__dirname, pkg.source),
    //Where we put the production code
    output: {
      path: path.resolve(__dirname, buildDir),
      // main file
      filename,
      // async chunks which are imported asynchronous "import('...').then(...)"
      chunkFilename: "[contenthash].js",
      // result as esm
      library: { type: "module" },
      // expose files imported asynchronous as chunks
      asyncChunks: true,
      clean: true,
    },
    externalsType: "module",
    externals: IGNORE_EXTERNALS || isDevelopment ? {} : externals,
    // This says to webpack that we are in development mode and write the code in webpack file in different way
    mode: "development",
    module: {
      rules: [
        //Allows use javascript
        {
          test: /\.(js|jsx|m?js)$/,
          type: "javascript/auto",
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/i,
          use: [
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [require("tailwindcss"), require("autoprefixer")],
                },
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [require("tailwindcss"), require("autoprefixer")],
                },
              },
            },
            "sass-loader",
          ],
        },
        // config for background svgs in jsx. IMPORTANT: to differentiate between svgs that are to be used as bg images and those that are to be loaded
        // as components we have to add a query parameter `?url` to the images to be loaded as url for use in background images in jsx files
        //. example for import statement: import heroImage from "./img/app_bg_example.svg?url"
        // type "asset" chooses automatically between inline embed or loading as file depending on file size, similar to previously using url-loader and limit
        {
          test: /\.svg$/i,
          type: "asset",
          resourceQuery: /url/, // import filename: *.svg?url
        },
        // svg config for svgs as components in jsx files
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] }, // exclude react component if import filename *.svg?url
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                svgo: false,
              },
            },
          ],
        },
        // config for background svgs in css
        // type "asset" chooses automatically between inline embed or loading as file depending on file size, similar to previously using url-loader and limit
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          issuer: /\.s?css$/,
          type: "asset",
        },
        //Allows use of images
        {
          test: /\.(png|jpg)$/i,
          type: "asset",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".json"],
      fallback: {
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
        util: require.resolve("util/"),
        assert: require.resolve("assert/"),
        fs: false,
        module: false,
      },
    },
    optimization: {
      // DO NOT USE splitChunks!!! It splits code in to files and can't
      // be loaded as a widget.
      // splitChunks: { chunks: "all" },

      // Minimize just in production.
      minimize: !isDevelopment,
      // Default minimizer for JAVASCRIPT is also included, no need to define a new one BUT do NOT REMOVE `...` to
      // not override default minimizers
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: require.resolve("process/browser"),
        Buffer: require.resolve("buffer/"),
      }),

      //Allows to create an index.html in our build folder
      new HtmlWebpackPlugin({
        // do not inject script tags into html
        inject: false,
        template: path.resolve(__dirname, "public/index.html"), //we put the file that we created in public folder
        favicon: path.resolve(__dirname, "public/favicon.ico"),
        templateParameters: {
          // provide output filename to the template
          MAIN_FILENAME: filename,
          // merge props from package.json and secretProps.json
          // package.json -> appProps contains metadata like value and description
          // to get only the value we use the reduce function on keys array
          PROPS: JSON.stringify(appProps()),
        },
      }),
    ].filter(Boolean),

    //Config for webpack-dev-server module version 4.x
    devServer: {
      // This option onBeforeSetupMiddleware allows us to serve a test json to see
      // how the react-query lib reacts
      onBeforeSetupMiddleware: function (devServer) {
        devServer.app.get("/colors.json", function (req, res) {
          res.json(testData)
        })
      },

      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      port: process.env.PORT,
      host: "0.0.0.0",

      historyApiFallback: true,
      allowedHosts: "all",
      // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
      // for the WebpackDevServer client so it can learn when the files were
      // updated. The WebpackDevServer client is included as an entry point
      // in the webpack development configuration. Note that only changes
      // to CSS are currently hot reloaded. JS changes will refresh the browser.
      hot: true,
      // quiet: true,
      // Use 'ws' instead of 'sockjs-node' on server since we're using native
      // websockets in `webpackHotDevClient`.
      webSocketServer: "ws",
      client: {
        webSocketURL: "ws://0.0.0.0:80/ws",
      },
    },
  }
}
```

In the `public/index.html`

```html
<!-- .... -->
<script type="module">
  import("./<%= MAIN_FILENAME %>").then((app) =>
    app.mount(document.getElementById("root"), {
      props: JSON.parse("<%=PROPS%>"),
    })
  )
</script>

<div id="root"></div>
<!-- ... -->
```
