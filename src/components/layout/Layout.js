import tw from "twin.macro"

import PageHead from "./PageHead"
import PageFooter from "./PageFooter"
import Content from "../landingpage/Content"

const LayoutWrapper = tw.div`
  bg-hero-background
  bg-no-repeat
  bg-top
`


const Layout = () => {
  return (
    <LayoutWrapper>
      <PageHead />
      <Content />
      <PageFooter />
    </LayoutWrapper>
  )
}

export default Layout
