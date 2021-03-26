import React from "react"
import Layout from "./components/layout/Layout"
import GlobalStyles from "./lib/styling/GlobalStyles"
import useMicroFrontendWidget from "./lib/hooks/useMicroFrontendWidget"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
// use custom style cache to avoid conflicts with other apps

const MFELoader = () => {
  useMicroFrontendWidget({
    url: "https://juno.qa-de-1.cloud.sap/cdn/auth/0_1_1/widget.js",
  })
  return null
}

const App = () => (
  <CacheProvider value={createCache({ key: "juno-dashboard" })}>
    <GlobalStyles />
    <MFELoader />
    <Layout />
  </CacheProvider>
)

export default App
