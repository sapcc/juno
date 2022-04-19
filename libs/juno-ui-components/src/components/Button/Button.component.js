import React from "react"
import PropTypes from "prop-types"
import "./button.scss"
import { Icon } from "../Icon/index.js"
import { Spinner } from "../Spinner/index.js"

const btnBase = `
  font-bold
  inline-flex 
  justify-center 
  rounded-md
  shadow-sm 
  w-auto 
  focus:outline-none 
  focus-visible:ring-2
  focus-visible:ring-theme-focus
  focus-visible:ring-offset-1
  focus-visible:ring-offset-theme-focus
  disabled:cursor-not-allowed
  disabled:pointer-events-none
`

const btnSmall = `
  text-sm
  px-sm
  py-[0.3125rem]
`

const btnDefaultSize = `
  text-base
  px-[0.625rem] 
  py-[0.4375rem]
`

const btnLarge = `
  text-2xl
  px-lg
  py-sm
`

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
      return "1.125rem"
    case "large":
      return "2rem"
    default:
      return "1.5rem"
  }
}

const btnIconSmall = `
  mr-1
`

const btnIconLarge = `
  mr-3
`

const btnIconDefault = `
  mr-1
`

const iconClasses = (size, variant) => {
  const iconColor =
    variant === "default" ? "text-theme-button-default-icon" : ""
  switch (size) {
    case "small":
      return `${btnIconSmall} ${iconColor}`
    case "large":
      return `${btnIconLarge} ${iconColor}`
    default:
      return `${btnIconDefault} ${iconColor}`
  }
}

const progressClass = (progress) => {
  const progClass = progress ? `in-progress` : ``
  return progClass
}

const spinnerSize = (size) => {
  switch (size) {
    case "small":
      return "1.125rem" // 18px/16px
    case "large":
      return "2rem" // 32px/16px
    default:
      return "1.5rem" // 24px/16px
  }
}

const spinnerColorClass = (variant, disabled) => {
  const defaultButtonSpinnerColor = disabled
    ? "text-theme-default"
    : "text-theme-button-default-icon"
  switch (variant) {
    case "primary":
      return "text-theme-button-primary"
    case "primary-danger":
      return "text-theme-button-primary-danger"
    case "subdued":
      return "text-theme-button-subdued"
    default:
      return defaultButtonSpinnerColor
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
  progress,
  progressLabel,
  ...props
}) => {
  const titleValue = title || label || ""

  const buttonIcon = progress ? (
    <Spinner
      size={spinnerSize(size)}
      color={`${spinnerColorClass(variant, disabled)}`}
    />
  ) : icon ? (
    <Icon
      icon={icon}
      className={`${iconClasses(size, variant)}`}
      size={size ? iconSize(size) : null}
    />
  ) : null

  const buttonLabel =
    progress && progressLabel ? progressLabel : label || children

  const button = (
    <button
      type="button"
      className={`juno-button juno-button-${variant} ${btnBase} ${sizeClass(size)} ${progressClass(progress)} ${className}`}
      disabled={disabled}
      onClick={onClick}
      title={titleValue}
      {...props}
    >
      {buttonIcon}
      {buttonLabel}
    </button>
  )

  const anchor = (
    <a
      href={href}
      role="button"
      className={`juno-button juno-button-${variant} ${btnBase} ${sizeClass(size)} ${progressClass(progress)} ${className}`}
      disabled={disabled}
      onClick={onClick}
      title={titleValue}
      {...props}
    >
      {buttonIcon}
      {buttonLabel}
    </a>
  )

  return href ? anchor : button
}

Button.propTypes = {
  /** Choose a variant for your purpose. May leave empty to get default button. */
  variant: PropTypes.oneOf(["primary", "primary-danger", "default", "subdued"]),
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
  /** Whether the button action is in progress */
  progress: PropTypes.bool,
  /** Display an alternative label while the button action is in progress */
  progressLabel: PropTypes.string,
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
  progress: false,
  progressLabel: "",
}
