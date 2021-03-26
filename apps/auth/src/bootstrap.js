import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { GlobalStyles } from "twin.macro"

export const init = (wrapper, props) => {
  wrapper = wrapper.attachShadow({ mode: "closed" })
  const stylesCache = createCache({
    key: "juno-auth-styles",
    container: wrapper,
  })
  ReactDOM.render(
    <CacheProvider value={stylesCache}>
      <GlobalStyles />
      <App {...props} />
    </CacheProvider>,
    wrapper
  )
}
