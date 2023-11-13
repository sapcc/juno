import React from "react"

// Shows a color and a name, given through props.colorName
// The Card is used by ColorPalette.jsx
export function ColorCard(props) {
  if (!props.colorName) {
    console.warn("ColorCard has no color name")
    return (
      <>
        <p>name of the color is needed</p>
      </>
    )
  }

  const colorContainerStyle = `
    jn-h-16 ${props.colorClass}
  `

  return (
    <div className="jn-rounded-lg jn-border jn-border-theme-light">
      <div className="jn-p-3 jn-text-theme-highest">
        <p>{props.colorName}</p>
      </div>
      <div className={colorContainerStyle}></div>
      <div className="jn-px-3 jn-py-4 jn-bg-theme-light">
        <p>bg-theme-{props.colorName}</p>
      </div>
    </div>
  )
}