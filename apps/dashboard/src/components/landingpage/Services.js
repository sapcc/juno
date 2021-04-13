import tw from "twin.macro"

import { H2, H3, H5, SectionHead } from "../shared/StyledComponents"

import { ReactComponent as ServicesIcon } from "../../assets/images/Service_Icon.svg"


const Container = tw.div`
  py-20
  bg-gradient-radial
  from-sap-dark-blue-800
  to-transparent
`

const SectionIcon = tw(ServicesIcon)`
  mx-auto
  -mt-32
  w-24
`

const ServiceList = tw.div`
  grid
  grid-cols-4
  gap-x-12
  gap-y-14
`

const Service = tw.div`
  bg-sap-dark-blue-850
  shadow-md
  rounded-lg
  p-5
`

const H5Underline = tw(H5)`
  pb-4
  border-b-3
  border-sap-blue
`

const Services = () => {

  return (
    <Container>
      <SectionIcon />
      <SectionHead>
        <H3 color="blue">Our Services</H3>
        <H2>Available in Converged Cloud</H2>
      </SectionHead>

      <ServiceList>
        <Service>
          <H5Underline color="blue">Compute & Block Storage</H5Underline>
        </Service>
        <Service>Service 2</Service>
        <Service>Service 3</Service>
        <Service>Service 4</Service>
        <Service>Service 5</Service>
        <Service>Service 6</Service>
      </ServiceList>

    </Container>
  )
}

export default Services