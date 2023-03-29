# Juno UI Components Library

## Installation

To include Juno UI components as a dev dependency in your app install with yarn:

```bash
yarn add --dev juno-ui-components
```

…or declare manually as a dev-dependency:

```js
// package.json
"devDependencies": {
  ...
  "juno-ui-components": ">= 0"
  ...
}
```

```bash
yarn install
```

## Working With Tailwind

Juno comes with [Tailwind](https://tailwindcss.com/) included, so when using Juno you automatically can use tailwind in your project.

To be able to make full use of the predefined colors and other custom properties from the Juno UI components library you will need to include the ui components tailwind config into your application's tailwind config like this:

```js
module.exports = {
  presets: [
    require("juno-ui-components/build/lib/tailwind.config")
  ],
 ...
}
```

Doing this lets you use Tailwind classnames from the Juno UI Components library.

## Development

In order to work ON (NOT WITH) the Juno Design System and its components run storybook with:

```bash
yarn workspace juno-ui-components storybook
```

or just run from the root directory of this repository `npm run ui-components`

Run the test suite:

```bash
yarn workspace juno-ui-components test
```
