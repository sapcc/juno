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

## Props

- region (string) preselected region
- domain (string) preselected domain
- project (string) scope project name
- projectID (string) scope project ID
- sso (boolean) if both region and domain are given and sso is true, an attempt is first made to login the user using his SSO certificate. The fallback is "login with password".

## Events

Events this app responds to

- AUTH_GET_TOKEN responds with {authToken,token}
- AUTH_REVOKE_TOKEN

Events that this app sends

- AUTH_UPDATE_TOKEN responds with {authToken,token}

Examples:

```
on("AUTH_UPDATE_TOKEN", ({ authToken, token }) => {
  setToken(token)
  setAuthToken(authToken)
})

send("AUTH_REVOKE_TOKEN")

send("AUTH_GET_TOKEN", {
  receiveResponse: ({ authToken, token }) => {
    setToken(token)
    setAuthToken(authToken)
  },
})
```
