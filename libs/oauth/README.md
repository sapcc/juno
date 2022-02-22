# OpenID Connect Hook

React ONLY!!!
Web ONLY!!!

The oauth hook implements the "id token" flow of the OIDC specification. The hook expects two parameters "issuerURL" and "clientID". Calling the "login" functions redirects the user to the Open ID Provider and after a successful login, the user ends up back at the last visited URL. Calling the "logout" functions resets the current session.

```js
import { useOidcAuth } from "oauth"

const App = () => {
  const { auth, login, logout } = useOidcAuth({
    issuerURL: "ISSUER_URL",
    clientID: "CLIENT_ID",
  })

  return (
      <div>
        {auth ?
          <h1>Hi {auth.first_name}</h1>
          <p>{auth.full_name}</p>
          <p>{auth.expiresAt}</p>
          <pre>{JSON.stringify(auth)}</pre>
          <button onClick={logout}>Logout</button>
        :
          <button onClick={login}>Login</button>
        }
      </div>
    )
}
```

## Install

add oauth to dependencies in package.json

```json
  ...
  "dependencies": {
    "oauth": "workspace:*"
  },
  ....
```

## useOidcAuth

Executes the id token flow against the issuerURL with the clientID.

- clientID, this information is stored in the OpenID provider.
- issuerURL, This URL can usually be found at the endpoint https://PROVIDER_HOST/.well-known/openid-configuration.

### Returns

- auth, object which contains "id_token", "first_name", "last_name", "full_name", "email" and "expiresAt"
- login, function
- logout, function(resetOIDCSession:bool). If resetOIDCSession is true then the user is redirected to the OIDC logout page

# Development

```bash
yarn test
yarn build
```
