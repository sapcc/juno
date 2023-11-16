import React, { useEffect, useState } from "react"
import tailwindColors from "./TailwindColors"
import { ColorCard } from "./ColorCard"
import { TextColorCard } from "./TextColorCard"

import { StyleProvider } from "../../components/StyleProvider"
import { ContentArea } from "../../components/ContentArea/index"
import { getCurrentThemeMode } from "../../../.storybook/juno-addon/themes"
import { useChannel, addons } from "@storybook/preview-api"

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

  const [parentTheme, setParentTheme] = useState(
    "theme-" + getCurrentThemeMode()
  )

  useEffect(() => {
    const updateThemeClass = (mode) => {
      setParentTheme("theme-" + mode)
    }
    const channel = addons.getChannel()
    if (channel) {
      channel.on("JUNO_THEME_CHANGE", updateThemeClass)
    }
    return () => {
      if (channel) channel.off("JUNO_THEME_CHANGE", updateThemeClass)
    }
  }, [])

  const theme = props.theme
  const gridStyle = `jn-grid jn-gap-4 xl:jn-grid-cols-4 md:jn-grid-cols-3 jn-grid-cols-2 jn-mb-6`
  const h2Style = "jn-text-xl jn-my-2 jn-font-semibold"

  return (
    <div>
      <StyleProvider
        key="decorator"
        stylesWrapper="shadowRoot"
        theme={parentTheme}
      >
        <ContentArea className={`jn-p-4 jn-rounded-xl ${theme}`}>
          <h2 className={h2Style}>Theme colors</h2>
          <div className={gridStyle}>
            {Object.entries(tailwindColors.getThemeColors).map((color) => (
              <ColorCard
                key={color[0]}
                prefix="theme-"
                colorName={color[0]}
                colorClass={color[1]}
              />
            ))}
          </div>
          <h2 className={h2Style}>Font colors</h2>
          <div className={gridStyle}>
            {Object.entries(tailwindColors.getThemeTextColors).map(
              (textColor) => (
                <TextColorCard
                  key={textColor[0]}
                  colorName={textColor[0]}
                  colorClass={textColor[1]}
                />
              )
            )}
          </div>
        </ContentArea>
      </StyleProvider>
    </div>
  )
}
