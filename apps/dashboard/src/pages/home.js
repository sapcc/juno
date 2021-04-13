import tw from "twin.macro"
import { ReactComponent as CCPlusOneLogo } from "../assets/images/CCplusOne_logo.svg"
import { LayoutContainer, PLarge } from "../components/shared/StyledComponents"

import Pricing from "../components/landingpage/Pricing"
import Benefits from "../components/landingpage/Benefits"
import Worldmap from "../components/landingpage/Worldmap"
import Services from "../components/landingpage/Services"
const Container = tw(LayoutContainer)`
  pt-16
  px-16
`

const PageLead = tw.div`
  mx-8
`

const LeadText = tw(PLarge)`
  py-8
  ml-8
  w-3/5
`

const Home = () => {
  return (
    <>
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
        <Benefits />
      </Container>

      <Worldmap />

      <LayoutContainer>
        <Services />
      </LayoutContainer>
    </>
  )
}

export default Home
