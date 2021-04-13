import React from "react"
import GlobalStyles from "./lib/styling/GlobalStyles"
import Pages from "./components/Pages"
import MicroFrontend from "./components/MicroFrontend"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"

const App = () => (
  // use custom style cache to avoid conflicts with other apps
  <CacheProvider value={createCache({ key: "juno-dashboard" })}>
    <GlobalStyles />
    <Pages />
    <MicroFrontend
      name="auth"
      version="0_1_3"
      region="qa-de-1"
      domain="monsoon3"
      sso
    />
  </CacheProvider>
)

export default App
