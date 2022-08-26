const Dotenv = require("dotenv-webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require("webpack")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const package = require("./package.json")
const TerserPlugin = require("terser-webpack-plugin")

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
      // Do NOT CHANGE public path since a micro frontend should not change the URL. Micro frontends do not OWN the URL because
      // normally they are hosted and should not change the state from the host.
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
        // svg config for svgs as components in jsx files
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          issuer: /\.jsx?$/,
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
      splitChunks: { chunks: "all" },
      // Minimize just in production.
      minimize: !isDevelopment,
      // Default minimizer for JAVASCRIPT is also included, no need to define a new one BUT do NOT REMOVE `...` to
      // not override default minimizers
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    plugins: [
      new Dotenv({
        path: "./.env.local",
        safe: false,
      }),

      new webpack.ProvidePlugin({
        process: require.resolve("process/browser"),
        Buffer: require.resolve("buffer/"),
      }),
      //Allows remove/clean the build folder
      new CleanWebpackPlugin(),

      //Allows to create an index.html in our build folder
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"), //we put the file that we created in public folder
        favicon: path.resolve(__dirname, "public/favicon.ico"),
      }),
      // new PurgecssPlugin({
      //   paths: glob.sync(path.join(__dirname, "src/*.js"), { nodir: true }),
      // }),
      new webpack.container.ModuleFederationPlugin({
        name: package.name,
        library: { type: "var", name: package.name },
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

    // OLD dev server config for webpack-dev-server version 3.x
    // devServer: {
    //   contentBase: path.resolve(__dirname, "dist"),
    //   port: process.env.PORT,
    //   host: "0.0.0.0",

    //   historyApiFallback: true,
    //   disableHostCheck: true,
    //   injectClient: false,
    //   // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
    //   // for the WebpackDevServer client so it can learn when the files were
    //   // updated. The WebpackDevServer client is included as an entry point
    //   // in the webpack development configuration. Note that only changes
    //   // to CSS are currently hot reloaded. JS changes will refresh the browser.
    //   hot: true,
    //   // quiet: true,
    //   // Use 'ws' instead of 'sockjs-node' on server since we're using native
    //   // websockets in `webpackHotDevClient`.
    //   transportMode: "ws",
    // },
    //Config for webpack-dev-server module version 4.x
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      port: process.env.PORT,
      host: "0.0.0.0",

      historyApiFallback: true,
      allowedHosts: "all",
      client: false,
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
    },
    devtool: "source-map",
  }
}
