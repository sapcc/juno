import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import styles from "./styles.css"
import StyleProvider from "juno-ui-components"

export const init = (wrapper, props) => {
  console.log("WHOIS props: ", props);
  ReactDOM.render(
    <StyleProvider stylesWrapper="shadowRoot" theme={`${props.theme ? props.theme : "theme-dark"}`}>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <App {...props} />
    </StyleProvider>,
    wrapper
  )
}
