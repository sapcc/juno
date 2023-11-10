import React from "react"
import colors from "./colors"
import { ColorCard } from "./ColorCard"

import { StyleProvider } from "../../src/components/StyleProvider"
import { ContentArea } from "../../src/components/ContentArea/index"

export function ColorPalette(props) {
  return (
    <StyleProvider
      key="decorator"
      stylesWrapper="shadowRoot"
      theme={props.theme}
    >
      <ContentArea>
        {Object.entries(colors).map((color) => (
          <ColorCard key={color[0]} colorName={color[0]} />
        ))}
      </ContentArea>
    </StyleProvider>
  )
}
