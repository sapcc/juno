import React from "react"
import Layout from "./components/layout/Layout"
import GlobalStyles from "./lib/styling/GlobalStyles"
import useMicroFrontendWidget from "./lib/hooks/useMicroFrontendWidget"

function App() {
  useMicroFrontendWidget({
    url: "https://juno.qa-de-1.cloud.sap/cdn/auth/0_1_1/widget.js",
  })
  return (
    <>
      <GlobalStyles />
      <Layout />
    </>
  )
}

export default App
