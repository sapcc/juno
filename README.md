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

Start dashboard

```bash
yarn dashboard
```

Start any app in apps folder with workspace APP_NAME start

```bash
yarn workspace dashboard start
```

In workspaces

```
wb yarn dashboard
wb yarn workspace dashboard start
```

# Testing in production mode

## Run App in production mode

Sometimes the application reacts different when it is compiled in production mode. If you want to test the application in production mode run following command:

```bash
wb yarn workspace heureka production
```

## Reference local libs in production

Following an example how to reference a local lib which will be used in production. All changes made
directly on this lib will be reflected in production when restarting the server

```js
import { Router, Route, Switch } from "url-state-router/src/index.js"
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
APP_PORT=$LOADER_PORT yarn workspace widget-loader start
```

Test im browser:

```
https://loader.<your-workspace-name>.ws2.eu-nl-1.cloud.sap/
```
