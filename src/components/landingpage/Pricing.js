import tw, { styled } from "twin.macro"
import { ReactComponent as UmbrellaIcon } from '../../assets/images/icon_umbrella.svg';
import { ReactComponent as AWSLogo } from '../../assets/images/AWS_logo.svg';
import { ReactComponent as AzureLogo } from '../../assets/images/Microsoft_Azure_logo.svg';
import { ReactComponent as CCShortLogo } from '../../assets/images/CCplusOne_short_logo.svg';

import { H4, FlexContainer } from "../shared/StyledComponents"
import { getBgColorStyle } from "../../lib/styling/StyleMap"


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
    divide-sap-dark-blue-dark
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

const ProgressContainer = tw.div`
  relative
  pt-20
`

const Progress = tw.div`
  h-8
  rounded-full
  border-sap-dark-blue
  border-4
  bg-white
  relative
`

const ProgressBar = tw.div`
  relative
  overflow-hidden
  h-full
  rounded-full
  bg-sap-blue
`

const ProgressIndicator = styled.div(() => [
  tw`
    absolute
    top-0
    -mt-1
    -ml-4
    h-8
    w-8
    rounded-full
    border-white
    border-opacity-70
    border-4
    bg-clip-padding
    bg-white
  `,
  getBgColorStyle
])

const IndicatorLogo = tw.div`
  absolute
  top-0
  -ml-12
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
  
      <CostComparison>
        <ProgressContainer>
          <IndicatorLogo style={{"left": "60%"}}>
            <CCShortLogo />
          </IndicatorLogo>
          <Progress>
            <ProgressBar style={{"width": "60%"}} />
            <ProgressIndicator color="gold" style={{"left": "60%" }}/>
          </Progress>
        </ProgressContainer>  
      </CostComparison>
    </Container>
  )
}

export default Pricing