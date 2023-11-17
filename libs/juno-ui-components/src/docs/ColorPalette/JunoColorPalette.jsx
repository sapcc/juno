import React, { useEffect, useState } from "react"
import tailwindColors from "./TailwindColors"
import { ColorCard } from "./ColorCard"

import { StyleProvider } from "../../components/StyleProvider"
import { ContentArea } from "../../components/ContentArea/index"
import { getCurrentThemeMode } from "../../../.storybook/juno-addon/themes"
import { useChannel, addons } from "@storybook/preview-api"

// Shows the colors from tailwind classes for a given theme (props.theme)
export function JunoColorPalette(props) {
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

  const gridStyle = `jn-grid jn-gap-4 xl:jn-grid-cols-4 md:jn-grid-cols-3 jn-grid-cols-2 jn-mb-6`

  return (
    <div>
      <StyleProvider
        key="decorator"
        stylesWrapper="shadowRoot"
        theme={parentTheme}
      >
        <ContentArea className={`jn-p-4`}>
          <div className={gridStyle}>
            {Object.entries(tailwindColors.getJunoColors).map((color) => (
              <ColorCard
                key={color[0]}
                colorName={color[0]}
                colorClass={color[1]}
              />
            ))}
          </div>
        </ContentArea>
      </StyleProvider>
    </div>
  )
}
