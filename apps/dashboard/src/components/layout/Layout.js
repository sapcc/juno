import tw from "twin.macro"

import GlobalStyles from "../../styles/GlobalStyles"
import PageHead from "./PageHead"
import PageFooter from "./PageFooter"

const LayoutWrapper = tw.div`
  bg-hero-background
  bg-no-repeat
  bg-top
`

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <GlobalStyles />
      <PageHead />
      {children}
      <PageFooter />
    </LayoutWrapper>
  )
}

export default Layout
