import { Global, css } from "@emotion/react"
import { GlobalStyles as BaseStyles } from "twin.macro"

const styles = css`
  html,
  body {
    /* background: #1E2B3B; */
    background: #19232f;
    color: #efefef;
  }

  body {
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={styles} />
  </>
)
export default GlobalStyles
