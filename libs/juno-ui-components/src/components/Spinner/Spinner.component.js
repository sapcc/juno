import React from "react"
import PropTypes from "prop-types"

const primary = `
  text-theme-accent
`

const danger = `
  text-theme-danger 
`

const success = `
  text-theme-success
`

const warning = `
  text-theme-warning  
`

const defaultColor = `
  text-theme-on-default
`

export const Spinner = ({ variant, size, className, ...props }) => {
  const mode = () => {
    switch (variant) {
      case "primary":
        return primary
      case "danger":
        return danger
      case "success":
        return success
      case "warning":
        return warning
      default:
        return defaultColor
    }
  }

  const sizing = (size) => {
    switch (size) {
      case "small":
        return "1rem"
      case "large":
        return "3rem"
      default:
        return size
    }
  }

  const sizeStyles = size ? { width: sizing(size), height: sizing(size) } : {}

  return (
    <svg
      className={`juno-spinner animate-spin mr-3 h-5 w-5 ${mode()} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={sizeStyles}
      role="progressbar"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

Spinner.propTypes = {
  /** The semantic color variant of the Spinner */
  variant: PropTypes.oneOf([
    "primary",
    "danger",
    "default",
    "success",
    "warning",
  ]),
  /** The size of the spinner: `small`, `large`, or any valid CSS length like `1.5rem`*/
  size: PropTypes.string,
  className: PropTypes.string,
}

Spinner.defaultProps = {
  className: "",
  variant: "default",
  size: null,
}
