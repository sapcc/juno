import React from "react"
import PropTypes from "prop-types"

const btn = `
  inline-flex 
  justify-center 
  rounded-md
  border
  shadow-sm 
  font-medium 
  w:full
  sm:w-auto 
  focus:outline-none 
  focus:ring
  disabled:opacity-50
`

const btnDefault = `
  text-theme-on-default
  bg-theme-default
  border-theme-default
  hover:bg-theme-default-hover
  disabled:cursor-default
  disabled:hover:bg-theme-default
`

const btnPrimary = `
  text-theme-on-primary
  bg-theme-primary
  border-theme-primary
  hover:bg-theme-primary-hover
  disabled:cursor-primary
  disabled:hover:bg-theme-primary
`

const btnDanger = `
  text-theme-on-danger
  bg-theme-danger
  border-theme-danger
  hover:bg-theme-danger-hover
  disabled:cursor-danger
  disabled:hover:bg-theme-danger
`

const btnSmall = `
  text-sm
  sm:text-sm
  px-2
  py-1
`

const btnDefaultSize = `
  text-sm 
  sm:text-base
  px-4 
  py-2
`

const btnLarge = `
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
      return btnDefaultSize
  }
}

/**
 * Primary UI component for users to trigger actions with.
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
  const titleValue = title || label
  return (
    <button
      type="button"
      className={`${btn} ${variantClass(variant)} ${sizeClass(size)}`}
      onClick={onClick}
      title={titleValue}
      {...props}
    >
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