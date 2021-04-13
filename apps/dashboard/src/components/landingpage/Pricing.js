import tw, { styled } from "twin.macro"
// import styled from "@emotion/styled/macro"

import { ReactComponent as UmbrellaIcon } from '../../assets/images/icon_umbrella.svg';
import { ReactComponent as AWSLogo } from '../../assets/images/AWS_logo.svg';
import { ReactComponent as AzureLogo } from '../../assets/images/Microsoft_Azure_logo.svg';
import { ReactComponent as CCShortLogo } from '../../assets/images/CCplusOne_short_logo.svg';

import { H4, FlexContainer } from "../shared/StyledComponents"
import { getBgColorStyle, getTextColorStyle } from "../../lib/styling/StyleMap"


const Container = styled.div`
  ${tw`
    // backdrop-filter
    // backdrop-blur-xl
    rounded-lg
    bg-white
    bg-opacity-5
    grid
    grid-cols-1
    xl:grid-cols-3
    border
    border-white
    border-opacity-5
    divide-x-4
    divide-sap-dark-blue-900
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
  xl:col-span-3
  border-none
`

const HeroNumber = tw.div`
  text-sap-gold
  text-5xl
  xl:text-6xl
  text-center
  font-medium
  pb-4
`

const P = tw.p`
  font-thin
  text-base
  xl:text-lg
`

const IconContainer = tw.div`
  pl-4
`

const ProgressContainer = tw.div`
  relative
  pt-20
  pb-8
`

const Progress = tw.div`
  h-8
  rounded-full
  border-sap-dark-blue
  border-opacity-70
  bg-clip-padding
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

const ProgressFootnote = tw.div`
  flex
  justify-between
  p-2
  font-thin
`

const IndicatorLogo = styled.div`
  ${tw`
    absolute
    top-0
  `}

  margin-left: -4.75rem;
`

const IndicatorText = styled.div(() => [
  tw`
    absolute
    top-0
    mr-8
    text-sm
    font-medium
    leading-6
  `,
  getTextColorStyle
])



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
          <IndicatorLogo style={{"left": "30%"}}>
            <CCShortLogo />
          </IndicatorLogo>
          <IndicatorLogo style={{"left": "88%"}}>
            <AzureLogo />
          </IndicatorLogo>
          <IndicatorLogo style={{"left": "100%"}}>
            <AWSLogo />
          </IndicatorLogo>

          <Progress>
            <ProgressBar style={{"width": "30%"}} />
            <IndicatorText style={{"right": "70%"}}>1,632 &euro;*</IndicatorText>
            <IndicatorText style={{"right": "12%"}} color="black">4,497 &euro;*</IndicatorText>
            <IndicatorText style={{"right": "0"}} color="black">4,960 &euro;*</IndicatorText>
            <ProgressIndicator color="gold" style={{"left": "30%" }}/>
            <ProgressIndicator color="darkBlueLight" style={{"left": "88%" }}/>
            <ProgressIndicator color="darkBlueLight" style={{"left": "100%" }}/>
          </Progress>

          <ProgressFootnote>
            <div>Configuration: Big Data example, 2500GB internet data traffic</div>
            <div>* approximate cost / month</div>
          </ProgressFootnote>
        </ProgressContainer>  
      </CostComparison>
    </Container>
  )
}

export default Pricing