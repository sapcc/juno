import React from "react"
import colors from "./TailwindThemeColors"
import { ColorCard } from "./ColorCard"

import { StyleProvider } from "../../components/StyleProvider"
import { ContentArea } from "../../components/ContentArea/index"

// Shows the colors from tailwind classes for a given theme (props.theme)
export function ColorPalette(props) {
  if (!props.theme) {
    console.warn("ColorPalette has no selected theme")
    return (
      <>
        <p>name of the theme is needed</p>
      </>
    )
  }

  return (
    <StyleProvider
      key="decorator"
      stylesWrapper="shadowRoot"
      theme={props.theme}
    >
      <ContentArea
        className={
          "jn-p-2 jn-rounded-md jn-grid jn-gap-4 xl:jn-grid-cols-4 md:jn-grid-cols-3 jn-grid-cols-2"
        }
      >
        {Object.entries(colors).map((color) => (
          <ColorCard
            key={color[0]}
            colorName={color[0]}
            colorClass={color[1]}
          />
        ))}
      </ContentArea>
    </StyleProvider>
  )
}
