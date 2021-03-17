import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

export const init = (wrapper, props) =>
  ReactDOM.render(<App {...props} />, wrapper)
