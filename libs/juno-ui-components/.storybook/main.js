const path = require("path")

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ["../src/**/*.stories.js"],
  addons: [
    "@storybook/addon-links",
    // "@storybook/addon-essentials",
    // "@storybook/addon-docs",
    // Since storybook 6.5.* there is an issue that the 'Docs' tab isn't visible anymore, See: https://github.com/storybookjs/storybook/issues/18876
    // the proposed workaround in the ticket is to include the 'addon-docs' addon as below (also need to set docs: false on 'addon-essentials')
    {
      name: path.dirname(require.resolve('@storybook/addon-docs/package.json')),
      options: { transcludeMarkdown: true },
    },
    { name: '@storybook/addon-essentials', options: { docs: false } },
    "@storybook/addon-controls",
    // "@storybook/theming",
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
    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    // Exclude SVG files so that they can be loaded via svgr
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;  

    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/, // import filename: *.svg?url
    })

    config.module.rules.push({
      test: /\.svg$/i,
      enforce: 'pre',
      issuer: /\.jsx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if import filename *.svg?url
      loader: require.resolve('@svgr/webpack'),
      options: {
        svgo: false, 
        titleProp: true
      }
    })

    // this is for background svgs in css
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      issuer: /\.s?css$/,
      type: 'asset',
    })

    // other images
    config.module.rules.push({
      test: /\.(png|jpg)$/i,
      type: 'asset',
    })

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
