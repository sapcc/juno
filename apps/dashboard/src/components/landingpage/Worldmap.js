import tw from "twin.macro"

import { H2, H3, LayoutContainer, SectionHead } from "../shared/StyledComponents"

import { ReactComponent as RegionIcon } from "../../assets/images/Region_Icon_sm.svg"
import { ReactComponent as WorldmapImage } from "../../assets/images/world.svg"


const Container = tw.div`
  bg-white-dotted
  py-20
`

const SectionIcon = tw(RegionIcon)`
  mx-auto
  -mt-32
  w-24
`

const Worldmap = () => {


  return(
    <Container>
      <SectionIcon />
      <LayoutContainer>
        <SectionHead>
          <H3 color="blue">Converged Cloud Regions</H3>
          <H2 color="black">Go to a regional dashboard</H2>
        </SectionHead>
        <WorldmapImage />
      </LayoutContainer>
    </Container>
  )
}

export default Worldmap