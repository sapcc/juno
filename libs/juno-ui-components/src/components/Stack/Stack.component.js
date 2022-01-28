import React from "react"
import PropTypes from "prop-types"

// Previously we used template literals to dynamically determine the gap classname like this: gap-${gap ? gap : '0'}
// however if we want to use tailwind jit this doesn't work since these dynamic classnames will get purged. The way
// you have to do it is to always select a complete tailwind classname. Read more here: 
// https://medium.com/coding-at-dawn/the-tailwind-css-jit-mode-bug-that-only-happens-in-production-4f25ef009fe8
const gapSize = (gap) => {
  switch (gap) {
    case "0":
      return "gap-0"
    case "px":
      return "gap-px"
    case "0.5":
      return "gap-0.5"
    case "1":
      return "gap-1"
    case "1.5":
      return "gap-1.5"
    case "2":
      return "gap-2"
    case "2.5":
      return "gap-2.5"
    case "3":
      return "gap-3"
    case "3.5":
      return "gap-3.5"
    case "4":
      return "gap-4"
    case "5":
      return "gap-5"
    case "6":
      return "gap-6"
    case "7":
      return "gap-7"
    case "8":
      return "gap-8"
    case "9":
      return "gap-9"
    case "10":
      return "gap-10"
    case "11":
      return "gap-11"
    case "12":
      return "gap-12"
    case "14":
      return "gap-14"
    case "16":
      return "gap-16"
    case "20":
      return "gap-20"
    case "24":
      return "gap-24"
    case "28":
      return "gap-28"
    case "32":
      return "gap-32"
    case "36":
      return "gap-36"
    case "40":
      return "gap-40"
    case "44":
      return "gap-44"
    case "48":
      return "gap-48"
    case "52":
      return "gap-52"
    case "56":
      return "gap-56"
    case "60":
      return "gap-60"
    case "64":
      return "gap-64"
    case "72":
      return "gap-72"
    case "80":
      return "gap-80"
    case "96":
      return "gap-96"
    default:
      return "gap-0"
  }
}

const baseStack = (direction, gap, wrap) => {
  return (
    `
      ${direction === "vertical" ? 'flex flex-col' : 'md:flex md:flex-row'}
      ${wrap && "flex-wrap"}
      ${gapSize(gap)}
    `
  )
}

const alignItems = (alignment) => {
  switch (alignment) {
    case "start":
      return "items-start"
    case "end":
      return "items-end"
    case "center":
      return "items-center"
    case "baseline":
      return "items-baseline"
    case "stretch":
      return "items-stretch"
    default:
      return ""
  }
}

const justifyItems = (distribution) => {
  switch (distribution) {
    case "start":
      return "justify-start"
    case "end":
      return "justify-end"
    case "center":
      return "justify-center"
    case "between":
      return "justify-between"
    case "around":
      return "justify-around"
    case "evenly":
      return "justify-evenly"
    default:
      return ""
  }
}

/**
 * A stack is a layout primitive that ensures its children are stacked either horizontally next to each other or vertically, one below the other.
 * In addition a gap can be defined which the stack injects between its children so they have some margin from one another.
 */
export const Stack = ({
  direction,
  gap,
  alignment,
  distribution,
  wrap,
  className,
  children,
  ...props
}) => {

  return (
    <div 
      className={`juno-stack ${baseStack(direction, gap, wrap)} ${alignItems(alignment)} ${justifyItems(distribution)} ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  )
}

Stack.propTypes = {
  /** Stack items horizontally or vertically */
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  /** Specify how items should be aligned on the cross axis (in a horizontal Stack this is the vertical alignment, in a vertical Stack it is the horizontal alignment) */
  alignment: PropTypes.oneOf(["start", "end", "center", "baseline", "stretch"]),
  /** Specify how items should be distributed on the main axis (in a horizontal Stack this is the horizontal distribution, in a vertical Stack it is the vertical distribution) */
  distribution: PropTypes.oneOf(["start", "end", "center", "between", "around", "evenly"]),
  /** Specify whether the Stack children should be allowed to wrap or not */
  wrap: PropTypes.bool,
  /** Can be any valid tailwind  spacing. See here: https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale */
  gap: PropTypes.oneOf(["0","px","0.5","1","1.5","2","2.5","3","3.5","4","5","6","7","8","9","10","11","12","14","16","20","24","28","32","36","40","44","48","52","56","60","64","72","80","96"])
}

Stack.defaultProps = {
  direction: "horizontal",
  alignment: "stretch",
  distribution: "start",
  wrap: false,
  gap: "0",
  className: ""
}