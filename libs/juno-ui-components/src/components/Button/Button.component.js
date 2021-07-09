import React from "react"
import PropTypes from "prop-types"

const btn = `
  inline-flex 
  justify-center 
  rounded-md
  border
  shadow-sm 
  font-medium 
  w-full
  sm:w-auto 
  focus:outline-none 
  focus:ring
  disabled:opacity-50
  disabled:cursor-default
`

const btnDefault = `
  text-theme-on-default
  bg-theme-default
  border-theme-default
  hover:bg-theme-default-hover
  disabled:bg-theme-default
`

const btnPrimary = `
  text-theme-on-primary
  bg-theme-primary
  border-theme-primary
  hover:bg-theme-primary-hover
  disabled:bg-theme-primary
`

const btnDanger = `
  text-theme-on-danger
  bg-theme-danger
  border-theme-danger
  hover:bg-theme-danger-hover
  disabled:bg-theme-danger
`

const btnSmall = `
  text-sm
  sm:text-sm
  px-sm
  py-xs
`

const btnDefaultSize = `
  text-sm 
  sm:text-base
  px-md 
  py-sm
`

const btnLarge = `
  text-xl
  sm:text-2xl
  px-lg
  py-sm
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
      return btnDefaultSize
  }
}

/**
 * The basic button component. Use this for `onClick` interactions.
 */
export const Button = ({
  label,
  title,
  variant,
  size,
  onClick,
  children,
  ...props
}) => {
  const titleValue = title || label || "unspecified button"
  return (
    <button
      type="button"
      className={`${btn} ${variantClass(variant)} ${sizeClass(size)}`}
      onClick={!props.disabled ? onClick : undefined}
      title={titleValue}
      {...props}
    >
      {label || children}
    </button>
  )
}

Button.propTypes = {
  /** Choose a variant for your purpose. May leave empty to get default button. */
  variant: PropTypes.oneOf(["primary", "danger", "default"]),
  /** Leave empty for default size */
  size: PropTypes.oneOf(["small", "default", "large"]),
  /** Button label can be passed like this or as children */
  label: PropTypes.string,
  /** Specify title for accesibility. Gets value of label if no title specified */
  title: PropTypes.string,
  /** Click handler  */
  onClick: PropTypes.func,
  /** Set to true to disable */
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  variant: "default",
  size: "default",
  title: null,
  onClick: undefined,
}
