import tw, { styled } from "twin.macro"
// import styled from "@emotion/styled/macro"

import { ReactComponent as UmbrellaIcon } from '../../assets/images/icon_umbrella.svg';
import { ReactComponent as AWSLogo } from '../../assets/images/AWS_logo.svg';
import { ReactComponent as AzureLogo } from '../../assets/images/Microsoft_Azure_logo.svg';
import { ReactComponent as CCShortLogo } from '../../assets/images/CCplusOne_short_logo.svg';

import { H4, FlexContainer } from "../shared/StyledComponents"
import { getBgColorStyle, getTextColorStyle } from "../../lib/styling/StyleMap"


const Container = tw.div`
    backdrop-filter
    backdrop-blur-xl
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
`

const Box = tw.div`
  px-16
  py-4
`

const BoxHighlight = tw(Box)`
  bg-gray-200
  rounded-tr-lg
  border-none
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

const HeroSm = tw.span`
  text-lg
  xl:text-xl
  font-light
  px-2
`

const HeroMd = tw.span`
  text-2xl
  xl:text-3xl
  font-light
  px-2
`

const P = tw.p`
  font-thin
  text-base
  xl:text-lg
`

const IconContainer = tw.div`
  pl-4
`

// const ProgressContainer = tw.div`
//   relative
//   pt-20
//   pb-8
// `

// const Progress = tw.div`
//   h-8
//   rounded-full
//   border-sap-dark-blue
//   border-opacity-70
//   bg-clip-padding
//   border-4
//   bg-white
//   relative
// `

// const ProgressBar = tw.div`
//   relative
//   overflow-hidden
//   h-full
//   rounded-full
//   bg-sap-blue
// `

// const ProgressIndicator = styled.div(() => [
//   tw`
//     absolute
//     top-0
//     -mt-1
//     -ml-4
//     h-8
//     w-8
//     rounded-full
//     border-white
//     border-opacity-70
//     border-4
//     bg-clip-padding
//     bg-white
//   `,
//   getBgColorStyle
// ])

// const ProgressFootnote = tw.div`
//   flex
//   justify-between
//   p-2
//   font-thin
// `

// const IndicatorLogo = styled.div`
//   ${tw`
//     absolute
//     top-0
//   `}

//   margin-left: -4.75rem;
// `

// const IndicatorText = styled.div(() => [
//   tw`
//     absolute
//     top-0
//     mr-8
//     text-sm
//     font-medium
//     leading-6
//   `,
//   getTextColorStyle
// ])



const Pricing = () => {

  return (
    <>
      <Container>
        <Box>
          <HeroNumber>
            <HeroSm>up to</HeroSm>
            -65,5
            <HeroMd>%</HeroMd>
          </HeroNumber>
          <H4>Average Price Benefit</H4>
          <P>
            Depending on your configuration, you have a significant cost benefit compared to the most expensive provider.
          </P>
        </Box>
        <Box>
          <HeroNumber>
            100
            <HeroMd>%</HeroMd>
          </HeroNumber>
          <H4>Free Traffic</H4>
          <P>
                  In CONVERGED CLOUD internet traffic is free. If you require large amounts of internet traffic this will be a significant cost saving compared to hyperscalers.
          </P>
        </Box>
        <BoxHighlight>
          <H4 color="gold">Cost Safeguarding</H4>
          <FlexContainer>
            <P>
              Services tailored to your needs. By dynamically adapting your quota package to your actual needs, we protect you from unnecessary costs.
            </P>
            <IconContainer>
              <UmbrellaIcon />
            </IconContainer>
          </FlexContainer>
        </BoxHighlight>
      </Container>


      <CostComparison>
 
      </CostComparison>
    </>
  )
}

export default Pricing