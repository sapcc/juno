# OpenID Connect Hook

React ONLY!!!
Web ONLY!!!

The oauth hook implements the id token flow of the OIDC specification. If both parameters "clientID" and "issuerURL" are given, the user is redirected to the Identity Provider (issuerURL). After a successful authentication, the identity provider redirects the user back to this app. Then "oauth" hook processes the response and returns the JWT.

```js
import { useOidcAuth } from "oauth"

const App = () => {
  const jwt = useOidcAuth({ clientID: "CLIENT_ID", issuerURL: "ISSUER_URL" })

  return <span>{jwt}</span>
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

# Development

```bash
yarn test
yarn build
```
