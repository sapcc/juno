const oidcConfig = {}

export async function getOidcConfig(issuerURL) {
  if (oidcConfig[issuerURL]) return oidcConfig[issuerURL]
  return fetch(new URL("/.well-known/openid-configuration", issuerURL)).then(
    (r) => r.json()
  )
}
