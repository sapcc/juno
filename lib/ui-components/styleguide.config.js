const webpack = require("webpack")

module.exports = {
  components: "src/components/**/*.js",
  serverHost: "0.0.0.0",
  webpackConfig: {
    devServer: {
      disableHostCheck: true,
      transportMode: "ws",
      // Prevent a WS client from getting injected as we're already including
      // `webpackHotDevClient`.
      injectClient: false,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      // fix "process is not defined" error:
      // (do "npm install process" before running the build)
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  },
  // theme: {
  //   color: {
  //     sidebarBackground: "#29022c",
  //     link: "white",
  //     linkHover: "grey",
  //   },
  //   fontSize: {
  //     base: 15,
  //     text: 16,
  //     small: 13,
  //     h1: 24,
  //     h2: 18,
  //     h3: 16,
  //     h4: 16,
  //     h5: 16,
  //     h6: 16,
  //   },
  // },
}
