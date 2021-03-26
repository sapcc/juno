const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require("webpack")

module.exports = (_, argv) => {
  const mode = argv.mode
  const isDevelopment = mode === "development"

  return {
    context: path.resolve(__dirname, "src"),
    entry: "./index.js",
    //Where we put the production code
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.[contenthash].js",
      // publicPath: process.env.PUBLIC_URL || "/",
    },
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
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["css-loader"],
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
      splitChunks: { chunks: "all" },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: require.resolve("process/browser"),
        Buffer: require.resolve("buffer/"),
      }),
      //Allows remove/clean the build folder
      new CleanWebpackPlugin(),

      //Allows to create an index.html in our build folder
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"), //we put the file that we created in public folder
      }),
      //This get all our css and put in a unique file
      new MiniCssExtractPlugin({
        filename: "styles.[contentHash].css",
      }),
      new webpack.container.ModuleFederationPlugin({
        name: "auth",
        library: { type: "var", name: "auth" },
        filename: "widget.js",
        exposes: {
          // expose each component
          "./App": "./App",
          "./widget": "./widget",
        },
        shared: ["react", "react-dom", "juno-ui-components"],
      }),

      //Allows update react components in real time
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),

    //Config for webpack-dev-server module. Attention: it is pre-version 4
    // devServer: {
    //   port: process.env.PORT,
    //   host: "0.0.0.0",
    //   historyApiFallback: true,
    //   firewall: false,
    //   client: { port: 443 },
    //   hot: true,
    // },
    //Config for webpack-dev-server module
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      port: process.env.PORT,
      host: "0.0.0.0",

      historyApiFallback: true,
      disableHostCheck: true,
      injectClient: false,
      // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
      // for the WebpackDevServer client so it can learn when the files were
      // updated. The WebpackDevServer client is included as an entry point
      // in the webpack development configuration. Note that only changes
      // to CSS are currently hot reloaded. JS changes will refresh the browser.
      hot: true,
      // quiet: true,
      // Use 'ws' instead of 'sockjs-node' on server since we're using native
      // websockets in `webpackHotDevClient`.
      transportMode: "ws",
    },
    devtool: "source-map",
  }
}
