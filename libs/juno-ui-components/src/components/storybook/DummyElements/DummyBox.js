import React from "react"
import tw, { styled, theme } from "twin.macro"



const sizeMap = {
  default: tw`px-4 py-3`
}

const getSizeStyle = ({size}) => sizeMap[size] || sizeMap.default


const Box = styled.div(() => [
  tw`
    bg-sap-blue
    text-white
    text-center
  `,
  getSizeStyle
])

const DummyBox = ({ label, size }) => {
  return (
      <Box size={size}>{label}</Box>
  )
}

export default DummyBox