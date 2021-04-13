import tw from "twin.macro"

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
      <PageHead />
      {children}
      <PageFooter />
    </LayoutWrapper>
  )
}

export default Layout
