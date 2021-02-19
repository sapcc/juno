import tw from "twin.macro"

const colorStyleMap = {
  blue: tw`text-sap-blue`,
  gold: tw`text-sap-gold`,
  default: tw`text-white`
}

const getColorStyle = ({color}) => colorStyleMap[color] || colorStyleMap.default

export {
  getColorStyle
}