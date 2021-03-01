const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { HotModuleReplacementPlugin } = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { ModuleFederationPlugin } = require("webpack").container

module.exports = {
  //our index file
  entry: path.resolve(__dirname, "src/index.js"),
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      //Allows use of images
      {
        test: /\.(png|jpg|svg)$/i,
        loader: "file-loader",
      },
    ],
  },
  optimization: {
    splitChunks: { chunks: "all" },
  },
  plugins: [
    //Allows remove/clean the build folder
    new CleanWebpackPlugin(),
    //Allows update react components in real time
    new HotModuleReplacementPlugin(),
    //Allows to create an index.html in our build folder
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"), //we put the file that we created in public folder
    }),
    //This get all our css and put in a unique file
    new MiniCssExtractPlugin({
      filename: "styles.[contentHash].css",
    }),
    new ModuleFederationPlugin({
      name: "auth",
      library: { type: "var", name: "auth" },
      filename: "widget.js",
      exposes: {
        // expose each component
        "./App": "./src/App",
        "./widget": "./src/widget",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  //Config for webpack-dev-server module
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
    // publicPath: process.env.PUBLIC_URL || "/",
  },
}
