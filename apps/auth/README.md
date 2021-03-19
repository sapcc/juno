# Authentication Micro Frontend

This micro frontend implements the auth interface of the Openstack Keystone API. The user is logged in using his SSO certificate or, if this is not available, with a username and password.

## Usage

### via script tag

```js
<script
  defer
  src="https://JUNO_HOSTNAME/cdn/widget-loader/VERSION/app.js"
  data-name="auth"
  data-version="MFE_VERSION"
></script>
```

Example:

```js
<script
  defer
  src="https://juno.global.cloud.sap/cdn/widget-loader/0_0_1/app.js"
  data-name="auth"
  data-version="0_0_1"
></script>
```

More information about options [here](https://github.com/sapcc/juno/blob/main/apps/widget-loader/README.md)

### import as module

Coming soon ...
