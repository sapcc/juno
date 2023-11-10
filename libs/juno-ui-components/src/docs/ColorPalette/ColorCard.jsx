import React, { useEffect, useState } from "react"

// Shows a color and a name, given through props.colorName
// The Card is used by ColorPalette.jsx
export function ColorCard(props) {
  if (!props.colorName) {
    console.warn("ColorCard has no colorName")
    return (
      <>
        <p>name of the color is needed</p>
      </>
    )
  }

  const tailwindColor = `
  jn-bg-theme-${props.colorName}
  jn-text-theme-${props.colorName}
`

  return (
    <div>
      <div className={tailwindColor}>
        <p> d</p>
      </div>
      <div>
        <p>{props.colorName}</p>
      </div>
    </div>
  )
}
