import tw, { styled } from "twin.macro"
// import styled from "@emotion/styled/macro"


import BenefitIcon01 from "../../assets/images/icon_benefit01.svg"
import BenefitIcon02 from "../../assets/images/icon_benefit02.svg"
import BenefitIcon03 from "../../assets/images/icon_benefit03.svg"
import BenefitIcon04 from "../../assets/images/icon_benefit04.svg"

import BenefitHeroImage01 from "../../assets/images/img_benefit01.png"
import BenefitHeroImage02 from "../../assets/images/img_benefit02.png"
import BenefitHeroImage03 from "../../assets/images/img_benefit03.png"
import BenefitHeroImage04 from "../../assets/images/img_benefit04.png"

import { H2, PMedium, Button } from "../shared/StyledComponents"


const Container = tw.div`
  bg-gradient-radial
  from-sap-dark-blue-800
  to-transparent
  pt-20
  mb-20
`

const TwoColumns = tw.div`
  grid
  grid-cols-1
  xl:grid-cols-2
  divide-x-4
  divide-sap-dark-blue-900
`

const BenefitHeroImage = tw.img`
  mt-10
  mb-4
`

const BenefitIcon = tw.img`
  absolute
`

const Column = tw.div`
  relative
`

const LeftColumn = styled.div`
  ${tw`
    inline-block
    float-right
    mr-14
    pt-32
  `}

  max-width: 526px;

  ${BenefitIcon} {
    ${tw`
      -right-2
    `}
  }
`

const RightColumn = styled.div`
  ${tw`
    inline-block
    ml-14
    -mt-10
  `}

  max-width: 526px;

  ${BenefitIcon} {
    ${tw`
      -left-2
    `}
  }
`

const Benefit = tw.div`
  pb-16
  pt-1
`



const Benefits = () => {

  return (
    <Container>
      <TwoColumns>
        <Column>
          <LeftColumn>
            <Benefit>
              <BenefitIcon src={BenefitIcon04} />
              <BenefitHeroImage src={BenefitHeroImage02} alt="Competitive Pricing" />
              <H2>Competitive Pricing</H2>
              <PMedium>
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                amet.
              </PMedium>
              <Button>Learn more</Button>
            </Benefit>
            
            <Benefit>
              <BenefitIcon src={BenefitIcon02} />
              <BenefitHeroImage src={BenefitHeroImage04} alt="24/7 Emergency Support" />
              <H2>24/7 Emergency Support</H2>
              <PMedium>
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                amet.
              </PMedium>
              <Button>Learn more</Button>
            </Benefit>
          </LeftColumn>
        </Column>
        <Column>
          <RightColumn>
            <Benefit>
              <BenefitIcon src={BenefitIcon01} />
              <BenefitHeroImage src={BenefitHeroImage01} alt="Worldwide Availability" />
              <H2>Worldwide Availability</H2>
              <PMedium>
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                amet.
              </PMedium>
              <Button>Learn more</Button>
            </Benefit>
            
            <Benefit>
              <BenefitIcon src={BenefitIcon03} />
              <BenefitHeroImage src={BenefitHeroImage03} alt="Internet Traffic Included" />
              <H2>Internet Traffic Included</H2>
              <PMedium>
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                amet.
              </PMedium>
              <Button>Learn more</Button>
            </Benefit>
          </RightColumn>
        </Column>
      </TwoColumns>
    </Container>

  )

}

export default Benefits