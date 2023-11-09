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

You can create an sceleton of an juno app or lib using our CLI.

### Prerequisites

You must have a node environment with npx installed.

### Installation

```bash
npx github:sapcc/juno create app myApp
```

Or

```bash
npx github:sapcc/juno create lib myLib
```

To create an app or lib inside the juno mono repo go to apps or libs in juno and call:

```bash
npx github:sapcc/juno create app myApp --internal
```

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

Start locally the widget loader within the container

```bash
wb
APP_PORT=$LOADER_PORT npm --workspace widget-loader start
```

Test im browser:

```
https://loader.<your-workspace-name>.ws2.eu-nl-1.cloud.sap/
```
