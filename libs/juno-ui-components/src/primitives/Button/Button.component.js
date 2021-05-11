import React from "react"
import PropTypes from "prop-types"
import tw from "twin.macro"

const btn = tw`
  w-full 
  text-sm 
  inline-flex 
  justify-center 
  rounded-md 
  border 
  shadow-sm 
  px-4 
  py-2 
  font-medium 
  focus:outline-none 
  focus:ring-2 
  focus:ring-offset-2 
  sm:text-base
  sm:w-auto 
  disabled:opacity-50
`

const btnDefault = tw`
  text-button-defaultForeground
  bg-button-defaultBg
  border-gray-300 
  focus:ring-button-defaultBgHover
  hover:bg-button-defaultBgHover
  disabled:hover:bg-button-defaultBg
  disabled:cursor-default
`

const btnPrimary = tw`
  text-button-primaryForeground 
  bg-button-primaryBg
  border-transparent 
  focus:ring-button-primaryBgHover
  hover:bg-button-primaryBgHover
  disabled:hover:bg-button-primaryBg
  disabled:cursor-default
`

const btnDanger = tw`
  text-white 
  bg-red-600 
  border-transparent 
  focus:ring-red-500 
  hover:bg-red-700
  disabled:hover:bg-red-600
  disabled:cursor-default
`

const btnSmall = tw`
  text-sm
  sm:text-sm
  px-2
  py-1
`

const btnLarge = tw`
  text-xl
  sm:text-2xl
  px-6
  py-2
`

const variantClass = (variant) => {
  switch (variant) {
    case "primary":
      return btnPrimary
    case "danger":
      return btnDanger
    default:
      return btnDefault
  }
}

const sizeClass = (size) => {
  switch (size) {
    case "small":
      return btnSmall
    case "large":
      return btnLarge
    default:
      return ""
  }
}

/**
 * Primary UI component for users to trigger actions with.
 */
const Button = ({
  label,
  title,
  variant,
  size,
  onClick,
  children,
  ...props
}) => {
  const css = [btn, variantClass(variant), sizeClass(size)]
  const titleValue = title || label
  return (
    <button type="button" css={css} onClick={onClick} title={titleValue} {...props}>
      {label || children}
    </button>
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "danger", "default"]),
  size: PropTypes.oneOf(["small", "default", "large"]),
  label: PropTypes.string,
  title: PropTypes.string,
  // Optional click handler
  onClick: PropTypes.func,
}

Button.defaultProps = {
  variant: "default",
  title: null,
  size: "default",
  onClick: undefined,
}

export default Button
