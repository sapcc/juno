import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import StyleProvider from "juno-ui-components"

export const init = (wrapper, props) => {
  ReactDOM.render(
    <StyleProvider stylesWrapper="shadowRoot">
      <App {...props} />
    </StyleProvider>,
    wrapper
  )
}
