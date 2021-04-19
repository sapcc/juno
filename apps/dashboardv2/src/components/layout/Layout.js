import React from "react"
import tw from "twin.macro"

import PageHead from "./PageHead"
import PageFooter from "./PageFooter"
import GlobalStyles from "../../styles/GlobalStyles"
import MicroFrontend from "../MicroFrontend"
// import { Widget } from "../../lib/hooks/useMicroFrontend"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"

const LayoutWrapper = tw.div`
  bg-hero-background
  bg-no-repeat
  bg-top
`

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <CacheProvider value={createCache({ key: "juno-dashboard" })}>
        <GlobalStyles />
        <MicroFrontend
          name="auth"
          version="0_1_3"
          region="qa-de-1"
          domain="monsoon3"
          sso
        />

        <PageHead />
        {children}
        <PageFooter />
      </CacheProvider>
    </LayoutWrapper>
  )
}

export default Layout
