import React from "react"
import PropTypes from "prop-types"

const btn = `
  inline-flex 
  justify-center 
  rounded-md
  shadow-sm 
  w-full
  sm:w-auto 
  focus:outline-none 
  focus:ring-2
  focus:ring-focus
  disabled:opacity-50
  disabled:cursor-default
`

const btnDefault = `
  text-theme-on-default
  bg-theme-button-default
  border
  border-theme-button-default
  hover:bg-theme-button-default-hover
  disabled:bg-theme-default
`
const btnPrimary = `
  text-theme-button-primary
  border
  border-theme-button-primary
  bg-theme-button-primary
  hover:text-theme-button-primary-hover
  hover:bg-theme-button-primary-hover
  hover:border-theme-button-primary-hover
  disabled:bg-theme-primary
`

const btnSubdued = `
  text-theme-on-default
  bg-theme-button-default
  border
  border-theme-button-subdued
  hover:bg-theme-button-default-hover
  hover:text-theme-button-default-hover
  disabled:bg-theme-default
`

const btnDanger = `
  text-theme-on-danger
  bg-theme-button-danger
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
    case "subdued":
      return btnSubdued
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
  disabled,
  className,
  onClick,
  children,
  ...props
}) => {
  const titleValue = title || label || "unspecified button"
  return (
    <button
      type="button"
      className={`button button-${variant} ${btn} ${variantClass(variant)} ${sizeClass(size)} ${className}`}
      disabled={disabled}
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
  variant: PropTypes.oneOf(["primary", "danger", "default", "subdued"]),
  /** Leave empty for default size */
  size: PropTypes.oneOf(["small", "default", "large"]),
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Button label can be passed like this or as children */
  label: PropTypes.string,
  /** Specify title for accessibility. Gets value of label if no title specified */
  title: PropTypes.string,
  /** Pass a className */
  className: PropTypes.string,
  /** Click handler  */
  onClick: PropTypes.func,
  /** Set to true to disable */
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  variant: "default",
  size: "default",
  disabled: null,
  className: "",
  title: null,
  onClick: undefined,
}
