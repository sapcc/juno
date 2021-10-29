# Juno

Is a collection of Micro Frontends (MFE)

## Apps

- [Dashboard](https://github.com/sapcc/juno/tree/main/apps/dashboard)
- [Widget Loader](https://github.com/sapcc/juno/tree/main/apps/widget-loader)
- [Auth](https://github.com/sapcc/juno/tree/main/apps/auth)
- [Designate](https://github.com/sapcc/juno/tree/main/apps/designate)

## Libs

- [UI Components](https://github.com/sapcc/juno/tree/main/libs/juno-ui-components)
- [Communicator](https://github.com/sapcc/juno/tree/main/libs/communicator)
- [Policy Engine](https://github.com/sapcc/juno/tree/main/libs/policy-engine)
- [URL State Provider](./libs/url-state-provider)
- [URL State Router](./libs/url-state-router)

## APIs

- [Mercury](https://github.com/sapcc/juno/tree/main/apis/mercury)

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
