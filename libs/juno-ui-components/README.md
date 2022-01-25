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
  "juno-ui-components": "workspace:*"
  ...
}
```

```bash
yarn install
```

## Working With Tailwind
Juno comes with [Tailwind](https://tailwindcss.com/) included, so when using Juno you automatically can use tailwind in your project.

## Color Variables
The Juno Design System comes with all colors defined as CSS variables ("custom properties").
Juno includes SAP brand colors (`--color-sap-…`), Juno specific colors (`--color-juno-…`), Juno theme specific colors (`--color-juno-theme-…`) as well as semantic colors.

A full overview of all colors included with Juno is here: *TODO: Include list here or reference to docs/storybook/website?*

## Adding Your Own Variables
*TODO*

## Development
In order to work ON (NOT WITH) the Juno Design System and its components run storybook from the root directory of this repository:

```bash
yarn storybook
```

Run the test suite:

```bash
yarn workspace juno-ui-components test
```
