const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const webpack = require("webpack")
const pkg = require("./package.json")
const outputRegex = /(.+)\/([^/]+)/

if (!pkg.source)
  throw new Error(
    'No source found in package.json. Please add "source": "src/index.js" to package.json'
  )

if (!outputRegex.test(pkg.module))
  throw new Error(
    'package.json: module not found or its format does not match "DIR/FILE.js"'
  )

const [_, buildDir, filename] = pkg.module.match(outputRegex)

module.exports = (_, argv) => {
  const mode = argv.mode
  const isDevelopment = mode === "development"

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
    // This says to webpack that we are in development mode and write the code in webpack file in different way
    mode: "development",
    module: {
      rules: [
        //Allows use javascript
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/, //don't test node_modules folder
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-react", { runtime: "automatic" }]],
          },
        },
        //Allows use of CSS
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
        //Allows use of images
        {
          test: /\.(png|jpg|svg)$/i,
          loader: "file-loader",
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
        },
      }),
    ],
    //Config for webpack-dev-server module
    devServer: {
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
