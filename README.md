# Juno

Is a collection of Micro Frontends (MFE)

- [Dashboard](https://github.com/sapcc/juno/tree/main/apps/dashboard)

- [Widget Loader](https://github.com/sapcc/juno/tree/main/apps/widget-loader)
- [Auth](https://github.com/sapcc/juno/tree/main/apps/auth)

## Libs

- [UI Components](https://github.com/sapcc/juno/tree/main/lib/juno-ui-components)

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
