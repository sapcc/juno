const path = require("path")

module.exports = {
  stories: [
    "../src/**/stories.mdx",
    "../src/**/stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          // important! use local installed postcss (version 8)
          implementation: require("postcss"),
        },
      },
    },
  ],

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          // important! use local installed postcss (version 8)
          options: { implementation: require("postcss") },
        },
        "sass-loader",
      ],
      include: path.resolve(__dirname, "../src"),
    })

    return config
  },
}
