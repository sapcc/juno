const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: { app: "./src/index" },
  mode: "development",

  devServer: {
    contentBase: path.resolve(__dirname, "build"),
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
    proxy: {
      "/cdn/auth/0_0_1": {
        target: "http://localhost:4000",
        pathRewrite: { "^/cdn/auth/0_0_1": "" },
      },
    },
  },
  output: {
    path: path.join(__dirname, "./build"),
    pathinfo: true,
    chunkFilename: "[name].[contenthash:8].chunk.js",
    // filename: "init.js",
  },

  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // inject: true,
      minify: true,
      excludeChunks: ["index"],
    }),
  ],
}
