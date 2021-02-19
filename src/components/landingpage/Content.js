import tw from "twin.macro"
import { ReactComponent as CCPlusOneLogo } from "../../assets/images/CCplusOne_logo.svg"

import Pricing from "./Pricing"

const Container = tw.div`
  container
  mx-auto
  pt-16
  px-16
`

const PageLead = tw.div`
  mx-8
`

const LeadText = tw.p`
  py-8
  ml-8
  w-3/5
  font-thin
  text-3xl
`

const Content = () => {
  return (
    <Container>
      <PageLead>
        <CCPlusOneLogo />
        <LeadText>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet.
        </LeadText>
      </PageLead>

      <Pricing />
    </Container>
  )
}

export default Content
