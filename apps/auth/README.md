# Auth App

This app implements the OIDC flow to login the user.

## Usage

### load via script tag

```js
<script
  defer
  src="https://assets.juno.global.cloud.sap/apps/widget-loader@latest/build/app.js"
  data-name="auth"
></script>
```

### load via Importmap

```js
<script
  defer
  src="https://assets.juno.global.cloud.sap/apps/widget-loader@latest/build/app.js"
  data-importmap-only="true"
></script>

<script type="module">
  import "@juno/auth@latest"
</script>
```

### load via import

```js
<script type="module">
  import "https://assets.juno.global.cloud.sap/apps/auth@latest/build/index.js"
</script>
```

Once the app is loaded, it tries to login the user via oidc. After a successful login, it fires an ==AUTH_UPDATE== event. Other apps that rely on authentication should use the ==communicator== lib to subscribe to it via ==listen("AUTH_UPDATE",(data) => void)==.

### events

- AUTH_UPDATE
  - data: {token, expires}
- AUTH_FAILED
  - data: {error}
