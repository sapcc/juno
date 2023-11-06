import "../../src/global.scss"
import { StyleProvider } from "../../src/components/StyleProvider"
import { ContentArea } from "../../src/components/ContentArea/index"
import { Container } from "../../src/components/Container/index"
import React, { useEffect } from "react"
import { useChannel, addons } from "@storybook/preview-api"
import { getCurrentTheme, getCurrentThemeMode } from "./themes"

const fixBodyBg = () => {
  document.body.style.setProperty(
    "background-color",
    getCurrentTheme().appContentBg,
    "important"
  )
}

fixBodyBg()

export default (Story, context) => {
  const [theme, setTheme] = React.useState("theme-" + getCurrentThemeMode())

  useEffect(() => {
    const updateThemeClass = (mode) => {
      // console.log("=======UPDATE JUNO THEME CLASS=======", mode)
      setTheme(`theme-${mode}`)
      fixBodyBg()
    }
    const channel = addons.getChannel()
    if (channel) {
      channel.on("JUNO_THEME_CHANGE", updateThemeClass)
    }
    updateThemeClass(getCurrentThemeMode())
    return () => {
      if (channel) channel.off("JUNO_THEME_CHANGE", updateThemeClass)
    }
  }, [])

  return (
    <StyleProvider key="juno-decorator" stylesWrapper="head" theme={theme}>
      <ContentArea>
        <Container px py>
          <Story />
        </Container>
      </ContentArea>
    </StyleProvider>
  )
}
