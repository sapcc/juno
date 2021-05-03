import React from "react"
import PropTypes from "prop-types"
import tw from "twin.macro"

const btn = tw`
  w-full 
  inline-flex 
  justify-center 
  rounded-md 
  border 
  shadow-sm 
  px-4 
  py-2 
  text-base 
  font-medium 
  focus:outline-none 
  focus:ring-2 
  focus:ring-offset-2 
  sm:text-sm
  sm:ml-3 
  sm:w-auto 
  disabled:opacity-50
`

const btnPrimary = tw`
  focus:ring-blue-500 
  text-white 
  hover:bg-blue-700 
  bg-blue-600 
  border-transparent 
`

const btnDanger = tw`
  focus:ring-red-500 
  text-white 
  hover:bg-red-700 
  bg-red-600 
  border-transparent 
`

const btnSuccess = tw`
  focus:ring-green-500 
  text-white 
  hover:bg-green-700 
  bg-green-600 
  border-transparent 
`

const btnWarning = tw`
  focus:ring-yellow-300 
  text-white 
  hover:bg-yellow-700 
  bg-yellow-600 
  border-transparent 
`

const btnDefault = tw`
  focus:ring-indigo-500 
  text-gray-700 
  hover:bg-gray-50 
  bg-white 
  border-gray-300 
`

const modeClass = (mode) => {
  switch (mode) {
    case "primary":
      return btnPrimary
    case "success":
      return btnSuccess
    case "warning":
      return btnWarning
    case "danger":
      return btnDanger
    default:
      return btnDefault
  }
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  mode,
  backgroundColor,
  labelColor,
  hoverColor,
  outlineColor,
  size,
  label,
  children,
  ...props
}) => {
  const css = [btn, modeClass(mode)]
  if (backgroundColor) css.push({ backgroundColor })
  if (labelColor) css.push({ color: labelColor })
  if (hoverColor) css.push({ "&:hover": { backgroundColor: hoverColor } })
  // if (outlineColor) css.push({ backgroundColor })
  return (
    <button type="button" css={css} {...props}>
      {label || children}
    </button>
  )
}

Button.propTypes = {
  /**
   * Color of button
   */
  mode: PropTypes.oneOf(["primary", "success", "danger", "warning", "default"]),

  /**
   * Custom background color
   */
  backgroundColor: PropTypes.string,
  /**
   * Custom label color
   */
  labelColor: PropTypes.string,
  /**
   * Custom hover color
   */
  hoverColor: PropTypes.string,
  /**
   * Custom outline color
   */
  outlineColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Button contents
   */
  label: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
}

Button.defaultProps = {
  mode: "default",
  label: null,
  size: "medium",
  backgroundColor: null,
  onClick: undefined,
}
