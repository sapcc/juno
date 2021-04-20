import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

export const init = (wrapper, props) => {
  wrapper.attachShadow({ mode: "open" })
  ReactDOM.render(<App {...props} />, wrapper.shadowRoot)
}
