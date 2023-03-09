import React from "react"
import PropTypes from "prop-types"
import "./button.scss"
import { Icon } from "../Icon/index.js"
import { knownIcons } from "../Icon/Icon.component.js"
import { Spinner } from "../Spinner/index.js"

const btnBase = `
  jn-font-bold
  jn-inline-flex 
  jn-justify-center 
  jn-items-center
  jn-rounded
  jn-shadow-sm 
  jn-w-auto
  focus:jn-outline-none 
  focus-visible:jn-ring-2
  focus-visible:jn-ring-theme-focus
  focus-visible:jn-ring-offset-1
  focus-visible:jn-ring-offset-theme-focus
  disabled:jn-cursor-not-allowed
  disabled:jn-pointer-events-none
`

const btnSmall = `
  jn-text-sm
  jn-leading-5
  jn-px-[0.4375rem]
  jn-py-[0.25rem]
`

const btnDefaultSize = `
  jn-text-base
  jn-leading-6
  jn-pl-[0.5625rem]  
  jn-pr-[0.625rem]
  jn-py-[0.375rem]
`

const btnLarge = `
  jn-text-2xl
  jn-pl-4
  jn-pr-lg
  jn-py-sm
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
  jn-mr-2
`

const btnIconLarge = `
  jn-mr-3
`

const btnIconDefault = `
  jn-mr-2
`

const iconClasses = (size) => {
  switch (size) {
    case "small":
      return `${btnIconSmall}`
    case "large":
      return `${btnIconLarge}`
    default:
      return `${btnIconDefault}`
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
  if (disabled) {
    return "jn-text-theme-disabled"
  } else if (variant === "default") {
    return "jn-text-theme-accent"
  }
  return ""
}

/**
 * The basic button component. Use this for `onClick` interactions.
 */
export const Button = React.forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const theVariant = variant || "default"
    const titleValue = title || label || ""

    const buttonIcon = progress ? (
      <Spinner
        size={spinnerSize(size)}
        color={`${spinnerColorClass(theVariant, disabled)}`}
      />
    ) : icon ? (
      <Icon
        icon={icon}
        className={`juno-button-icon ${
          label || children ? iconClasses(size) : null
        } `}
        size={size ? iconSize(size) : null}
      />
    ) : null

    const buttonLabel =
      progress && progressLabel ? progressLabel : label || children

    const handleClick = (event) => {
      onClick && onClick(event)
    }

    const button = (
      <button
        type="button"
        className={`juno-button juno-button-${theVariant} juno-button-${size}-size ${btnBase} ${sizeClass(
          size
        )} ${progressClass(progress)} ${className}`}
        disabled={disabled}
        onClick={handleClick}
        title={titleValue}
        ref={ref}
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
        className={`juno-button juno-button-${theVariant} juno-button-${size}-size ${btnBase} ${sizeClass(
          size
        )} ${progressClass(progress)} ${className}`}
        disabled={disabled}
        onClick={onClick}
        title={titleValue}
        ref={ref}
        {...props}
      >
        {buttonIcon}
        {buttonLabel}
      </a>
    )

    return href ? anchor : button
  }
)

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
  icon: PropTypes.oneOf(knownIcons),
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
  variant: undefined,
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
