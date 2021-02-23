require("dotenv").config()
const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { ModuleFederationPlugin } = require("webpack").container

const package = require(path.join(__dirname, "./package.json"))
console.log(package.name)
module.exports = (env) => {
  const isEnvDevelopment = env.NODE_ENV === "development"
  const isEnvProduction = env.NODE_ENV === "production"

  return {
    entry: "./src/index",
    mode: "development",

    devServer: {
      contentBase: path.join(__dirname, "./dist"),
      port: env.PORT,
      host: "0.0.0.0",

      disableHostCheck: true,
      // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
      // for the WebpackDevServer client so it can learn when the files were
      // updated. The WebpackDevServer client is included as an entry point
      // in the webpack development configuration. Note that only changes
      // to CSS are currently hot reloaded. JS changes will refresh the browser.
      hot: true,
      // Use 'ws' instead of 'sockjs-node' on server since we're using native
      // websockets in `webpackHotDevClient`.
      transportMode: "ws",
      publicPath: process.env.PUBLIC_URL,
    },
    output: {
      path: path.join(__dirname, "./dist"),
      pathinfo: isEnvDevelopment,
      publicPath: process.env.PUBLIC_URL,
      chunkFilename: isEnvProduction
        ? "js/[name].[contenthash:8].chunk.js"
        : "js/[name].chunk.js",
    },

    module: {
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ModuleFederationPlugin({
        name: "auth",
        library: { type: "var", name: "auth" },
        exposes: {
          // expose each component
          "./App": "./src/App",
        },
        shared: ["react", "react-dom"],
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: true,
        minify: isEnvProduction,
      }),
    ],
  }
}
