# Juno

Is a collection of Micro Frontends (MFE)

- [Overview](https://assets.juno.global.cloud.sap)

# Usage

use juno css styles in external projects

import variables.css from assets server

```html
<link
  rel="stylesheet"
  href="https://assets.juno.global.cloud.sap/libs/juno-ui-components@latest/build/lib/variables.css"
/>
```

or as part of sass

```sass
@import "https://assets.juno.global.cloud.sap/libs/juno-ui-components@latest/build/lib/variables.css";
```

and preset tailwind config with juno-ui-components config

```js
// tailwindcss.config.js
```

# Development

Use Webpack for apps, and Rollup for libraries

Start any app in apps folder with workspace APP_NAME start

```bash
npm -w dashboard run start
```

## In workspaces

```bash
wb npm -w dashboard run start
```

## Juno CLI

The Juno CLI facilitates the creation of a skeleton for a Juno app or library.

### Prerequisites

Ensure that you have a Node.js environment with `npx` installed.

### Installation

Use the following commands to create a new Juno app or library:

```bash
npx github:sapcc/juno create app myApp
```

or

```bash
npx github:sapcc/juno create lib myLib
```

If you wish to create an app or library within the Juno mono repository, navigate to the respective 'apps' or 'libs' directory in Juno and execute:

```bash
npx github:sapcc/juno create app myApp --internal
```

Feel free to replace `myApp` and `myLib` with your desired project names.

# Debug

If you want to run more the one Juno App/lib simultaneously you have then to assign different ports.
Following different port for the widget loader App:

```yaml
  juno:
    port: "3001"
    ports:
      ...
      - name: heureka
        number: "3005"
      - name: loader
        number: "3007"
      ...
```

Start locally the widget loader within the container:

```bash
wb
APP_PORT=$LOADER_PORT npm --workspace widget-loader start
```

Test im browser:

```
https://loader.<your-workspace-name>.ws2.eu-nl-1.cloud.sap/
```
