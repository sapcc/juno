import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import StyleProvider from "juno-ui-components"

export const init = (wrapper, props) => {
  ReactDOM.render(
    <StyleProvider stylesWrapper="shadowRoot" theme="dark">
      <App {...props} />
    </StyleProvider>,
    wrapper
  )
}
