import React from "react"
import PropTypes from "prop-types"

const baseStack = (direction, gap) => {
  return (
    `
      flex
      ${direction === "vertical" ? 'flex-col' : 'flex-row'}
      gap-${gap ? gap : '0'}
    `
  )
}

/**
 * A stack is a layout primitive that ensures its children are stacked either horizontally next to each other or vertically, one below the other.
 * In addition a gap can be defined which the stack injects between its children so they have some margin from one another.
 */
export const Stack = ({
  direction,
  gap,
  children,
  ...props
}) => {

  return (
    <div 
      className={`${baseStack(direction, gap)}`}
    >
      {children}
    </div>
  )
}

Stack.propTypes = {
  /** Stack items horizontally or vertically */
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  /** Can be any valid tailwind  spacing. See here: https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale */
  gap: PropTypes.oneOf([0,"px",0.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96])
}

Stack.defaultProps = {
  direction: "horizontal",
  gap: 0
}