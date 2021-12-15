import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const btnBase = `
  font-bold
  inline-flex 
  justify-center 
  rounded-md
  shadow-sm 
  w-full
  sm:w-auto 
  focus:outline-none 
  focus:ring-2
  focus:ring-focus
  disabled:cursor-not-allowed
  disabled:pointer-events-none
`

const btnDefault = `
  border
  text-theme-button-default
  bg-theme-button-default
  border-theme-button-default
  hover:text-button-default-hover
  hover:bg-theme-button-default-hover
  hover:border-theme-button-default-hover
  disabled:text-theme-button-default-disabled
  disabled:bg-theme-button-default-disabled
  disabled:border-theme-button-default-disabled
`
const btnPrimary = `
  border
  text-theme-button-primary
  bg-theme-button-primary
  border-theme-button-primary
  hover:text-theme-button-primary-hover
  hover:bg-theme-button-primary-hover
  hover:border-theme-button-primary-hover
  disabled:text-theme-button-primary-disabled
  disabled:bg-theme-button-primary-disabled
  disabled:border-theme-button-primary-disabled
`

const btnSubdued = `
  border
  text-theme-button-subdued
  bg-theme-button-subdued
  border-theme-button-subdued
  hover:bg-theme-button-subdued-hover
  hover:text-theme-button-subdued-hover
  hover:border-theme-button-subdued-hover
  disabled:text-theme-button-subdued-disabled
  disabled:bg-theme-button-subdued-disabled
  disabled:border-theme-button-subdued-disabled
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

const iconSize = (size) => {
  switch (size) {
    case "small":
      return '21'
    case "large":
      return '32'
    default:
      return '24'
  }
}

const btnIconSmall = `
  mr-1
`

const btnIconLarge = `
  mr-3
`

const btnIconDefault = `
  mr-2
`

const iconMargin = (size) => {
  switch (size) {
    case "small":
      return btnIconSmall
    case "large":
      return btnIconLarge
    default:
      return btnIconDefault
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
  href,
  icon,
  className,
  onClick,
  children,
  ...props
}) => {
  const titleValue = title || label || "button"

  const button = (
    <button
      type="button"
      className={`juno-button juno-button-${variant} ${btnBase} ${variantClass(variant)} ${sizeClass(size)} ${className}`}
      disabled={disabled}
      onClick={onClick}
      title={titleValue}
      {...props}
    >
      { icon ? <Icon icon={icon} className={iconMargin(size)} size={ size ? iconSize(size) : null } /> : null }
      {label || children}
    </button>
  )

  const anchor = (
    <a
      href={href}
      role="button"
      className={`juno-button juno-button-${variant} ${btnBase} ${variantClass(variant)} ${sizeClass(size)} ${className}`}
      disabled={disabled}
      onClick={onClick}
      title={titleValue}
      {...props}
    >
      { icon ? <Icon icon={icon} className={iconMargin(size)} size={ size ? iconSize(size) : null } /> : null }
      {label || children}
    </a>
  )

  return href ? anchor : button
}

Button.propTypes = {
  /** Choose a variant for your purpose. May leave empty to get default button. */
  variant: PropTypes.oneOf(["primary", "danger", "default", "subdued"]),
  /** Leave empty for default size */
  size: PropTypes.oneOf(["small", "default", "large"]),
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Optionally specify an href. This will turn the Button into an <a> element */
  href: PropTypes.string,
  /** Button label can be passed like this or as children */
  label: PropTypes.string,
  /** Specify title for accessibility. Gets value of label if no title specified */
  title: PropTypes.string,
  /** Pass the name of an icon the button should show. Can be any icon included with Juno. */
  icon: PropTypes.string,
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
  icon: null,
  className: "",
  href: null,
  title: null,
  onClick: undefined,
}
