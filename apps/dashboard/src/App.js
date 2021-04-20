import React from "react"
import GlobalStyles from "./lib/styling/GlobalStyles"
import PagesRouter from "./components/PagesRouter"
import MicroFrontend from "./components/MicroFrontend"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"

const App = () => (
  // use custom style cache to avoid conflicts with other apps
  <React.StrictMode>
    <CacheProvider value={createCache({ key: "juno-dashboard" })}>
      <GlobalStyles />
      <PagesRouter />
    </CacheProvider>
    <MicroFrontend
      name="auth"
      version="0_1_4"
      endpoint="identity-3.qa-de-1.cloud.sap"
      domain="ccadmin"
      project="cloud_admin"
      ss0
    />
  </React.StrictMode>
)

export default App
