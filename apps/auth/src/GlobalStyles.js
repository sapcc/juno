import React from "react"
import { Global, css } from "@emotion/react"
import { GlobalStyles as BaseStyles } from "twin.macro"

const styles = css`
  *,
  button {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={styles} />
  </>
)
export default GlobalStyles
