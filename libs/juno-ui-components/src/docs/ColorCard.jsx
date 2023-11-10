import React, { useEffect, useState } from "react"

export function ColorCard(props) {
  const iconClasses = `
  jn-bg-theme-${props.colorName}
  jn-text-theme-${props.colorName}
`

  return (
    <div>
      <div className={iconClasses}>
        <p> d</p>
      </div>
      <div>
        <p>{props.colorName}</p>
      </div>
    </div>
  )
}
