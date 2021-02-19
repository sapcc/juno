import tw, { styled } from "twin.macro"
import { ReactComponent as UmbrellaIcon } from '../../assets/images/icon_umbrella.svg';

import { H4, FlexContainer } from "../shared/StyledComponents"


const Container = styled.div`
  ${tw`
    rounded-lg
    bg-white
    bg-opacity-5
    grid
    grid-cols-1
    md:grid-cols-3
    border
    border-white
    border-opacity-5
    divide-x-4
    divide-sap-dark-blue
    divide-opacity-50
  `}

  backdrop-filter: saturate(1.1) blur(20px);
`

const Box = tw.div`
  px-16
  py-4
  border-b-4
  border-sap-dark-blue
  border-opacity-50
`

const BoxHighlight = tw(Box)`
  bg-gray-200
  border-none
  rounded-tr-lg
  text-black
  py-16
  pr-8
`

const CostComparison = tw(Box)`
  md:col-span-3
  border-none
`

const HeroNumber = tw.div`
  text-sap-gold
  text-6xl
  text-center
  font-medium
  pb-4
`

const P = tw.p`
  font-thin
  text-lg
`

const IconContainer = tw.div`
  pl-4
`

const Pricing = () => {

  return (
    <Container>
      <Box>
        <HeroNumber>150k</HeroNumber>
        <H4>Average Price Benefit</H4>
        <P>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </P>
      </Box>
      <Box>
        <HeroNumber>30%</HeroNumber>
        <H4>More Performance</H4>
        <P>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </P>
      </Box>
      <BoxHighlight>
        <H4 color="gold">Cost Safeguarding</H4>
        <FlexContainer>
          <P>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </P>
          <IconContainer>
            <UmbrellaIcon />
          </IconContainer>
        </FlexContainer>
      </BoxHighlight>
  
      <CostComparison>Bar</CostComparison>
    </Container>
  )
}

export default Pricing