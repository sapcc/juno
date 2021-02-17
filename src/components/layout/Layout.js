import tw from "twin.macro"

import PageHead from "./PageHead"
import PageFooter from "./PageFooter"
import Content from "../landingpage/Content"

const LayoutWrapper = tw.div``


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
