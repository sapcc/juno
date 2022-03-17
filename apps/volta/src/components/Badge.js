import React from "react"

const badge = `
  px-1
	text-sm
  font-bold
	flex
	rounded
	overflow-hidden
	items-center
  h-min  
  text-theme-default
  text-opacity-70
`

const backgroundClass = (variant) => {
  switch (variant) {
    case "error":
      return "bg-theme-error/50"
    case "warning":
      return "bg-theme-warning/50"
    case "success":
      return "bg-theme-success/50"
    case "info":
      return "bg-theme-info/50"
    case "danger":
      return "bg-theme-danger/50"
    default:
      return "bg-theme-info/50"
  }
}

const Badge = ({ variant, text, ...props }) => {
  return (
    <span
      className={`juno-badge juno-badge-${variant} ${badge} ${backgroundClass(
        variant
      )}`}
      {...props}
    >
      {text}
    </span>
  )
}

export default Badge
