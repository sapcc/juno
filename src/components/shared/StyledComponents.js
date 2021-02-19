import tw, { styled } from "twin.macro"

import { getColorStyle } from "../../lib/styling/StyleMap"


// ------------------------------
// TYPOGRAPHY

const H4 = styled.h4(() => [
  tw`
    text-2xl
    font-medium
    uppercase
    mb-3
  `,
  getColorStyle
])


// ------------------------------
// STANDARD ELEMENTS

const Button = tw.button`
  bg-sap-blue
  py-3
  px-10
  text-xl
  uppercase
`


// ------------------------------
// STANDARD ELEMENTS

const FlexContainer = tw.div`
  flex
  flex-auto
`

const FlexContainerCenter = tw(FlexContainer)`
  items-center
`


export {
  H4,
  Button,
  FlexContainer,
  FlexContainerCenter
}