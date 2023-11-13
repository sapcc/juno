import React from "react"
import colors from "./TailwindThemeColors"
import textColors from "./TailwindThemeTextColors"
import { ColorCard } from "./ColorCard"
import { TextColorCard } from "./TextColorCard"

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
      <ContentArea className={"jn-p-4 jn-rounded-xl"}>
        <h2 className="jn-text-xl jn-my-2 jn-font-semibold">Theme colors</h2>
        <div
          className={
            "jn-grid jn-gap-4 xl:jn-grid-cols-4 md:jn-grid-cols-3 jn-grid-cols-2 jn-mb-6"
          }
        >
          {Object.entries(colors).map((color) => (
            <ColorCard
              key={color[0]}
              colorName={color[0]}
              colorClass={color[1]}
            />
          ))}
        </div>
        <h2 className="jn-text-xl jn-my-2 jn-font-semibold">Font colos</h2>
        <div
          className={
            "jn-grid jn-gap-4 xl:jn-grid-cols-4 md:jn-grid-cols-3 jn-grid-cols-2"
          }
        >
          {Object.entries(textColors).map((textColor) => (
            <TextColorCard
              key={textColor[0]}
              colorName={textColor[0]}
              colorClass={textColor[1]}
            />
          ))}
        </div>
      </ContentArea>
    </StyleProvider>
  )
}
