# OpenID Connect (oauth) Lib

This lib implements a hook to get the authentication token via OpenID Connect. It handles the redirect to the OpenID provider as well as processing the response from the same.

It follows the implicit flow of the OIDC specification. The hook expects two parameters "issuerURL" and "clientID". Calling the "login" functions redirects the user to the Open ID Provider and after a successful login, the user ends up back at the last visited URL. Calling the "logout" functions resets the current session.

React ONLY!!!
Web ONLY!!!

## Usage

Explicit

```js
import { useOidcAuth } from "oauth"

const App = () => {
  const { auth, login, logout, error, isProcessing, loggedIn } = useOidcAuth({
    issuerURL: "ISSUER_URL",
    clientID: "CLIENT_ID",
  })

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Hi {auth.first_name}</h1>
          <p>{auth.full_name}</p>
          <p>{auth.expiresAt}</p>
          <pre>{auth.id_token}</pre>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  )
}
```

Implicit

```js
import { useOidcAuth } from "oauth"

const App = () => {
  const { auth, logout, login, isProcessing, error, loggedIn } = useOidcAuth({
    issuerURL: "ISSUER_URL",
    clientID: "CLIENT_ID",
    initialLogin: true,
  })

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Hi {auth.full_name}</h1>
          <Button onClick={() => logout({ resetOIDCSession: true })}>
            Logout
          </Button>
        </div>
      ) : isProcessing ? (
        <span>Sign in...</span>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </div>
  )
}
```

## Install

add oauth to dependencies in package.json

```json

  "dependencies": {
    "oauth": ">= 0"
  },

```

or via widget-loader

```html
<script
  src="https://assets.juno.eu-nl-1.cloud.sap/apps/widget-loader@latest/build/app.js"
  data-importmap-only="true"
></script>

<script type="module">
  const { useOidcAuth } = await import("@juno/oauth")
  // ...
</script>
```

## useOidcAuth

Executes the id token flow against the issuerURL with the clientID.

- clientID, this information is stored in the OpenID provider.
- issuerURL, This URL can usually be found at the endpoint https://PROVIDER_HOST/.well-known/openid-configuration.
- initialLogin, boolean. If true, then the oidc flow is executed immediately.

### Returns

- auth, object which contains
  - **id_token**, the bearer token to be used in API calls
  - **first_name**
  - **last_name**
  - **full_name**
  - **email**
  - **expiresAt**, milliseconds since Epoch
  - **expiresAtDate**, Date object
- login, function
- logout, function(resetOIDCSession:bool). If resetOIDCSession is true then the user is redirected to the OIDC logout page
