import tw from "twin.macro"

const textColorStyleMap = {
  blue: tw`text-sap-blue`,
  gold: tw`text-sap-gold`,
  black: tw`text-black`,
  white: tw`text-white`,
  default: tw`text-white`
}

const buttonStyleMap = {
  large: tw`py-3 px-10 text-lg 2xl:text-xl uppercase`,
  default: tw`py-2 px-8 text-base 2xl:text-lg`
}

const bgColorStyleMap = {
  blue: tw`bg-sap-blue`,
  darkBlueLight: tw`bg-sap-dark-blue-600`,
  gold: tw`bg-sap-gold`,
  default: tw`bg-white`
}

const getTextColorStyle = ({color}) => textColorStyleMap[color] || textColorStyleMap.default
const getBgColorStyle = ({color}) => bgColorStyleMap[color] || bgColorStyleMap.default
const getButtonStyle = ({type}) => buttonStyleMap[type] || buttonStyleMap.default

export {
  getTextColorStyle,
  getBgColorStyle,
  getButtonStyle
}