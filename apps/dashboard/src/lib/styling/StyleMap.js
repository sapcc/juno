import tw from "twin.macro"

const textColorStyleMap = {
  blue: tw`text-sap-blue`,
  gold: tw`text-sap-gold`,
  black: tw`text-black`,
  white: tw`text-white`,
  default: tw`text-white`
}

const bgColorStyleMap = {
  blue: tw`bg-sap-blue`,
  darkBlueLight: tw`bg-sap-dark-blue-light`,
  gold: tw`bg-sap-gold`,
  default: tw`bg-white`
}

const getTextColorStyle = ({color}) => textColorStyleMap[color] || textColorStyleMap.default
const getBgColorStyle = ({color}) => bgColorStyleMap[color] || bgColorStyleMap.default

export {
  getTextColorStyle,
  getBgColorStyle
}