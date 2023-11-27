import React, { useEffect, useState } from "react"

import { StyleProvider } from "../../components/StyleProvider/StyleProvider.component"
import { getCurrentThemeMode } from "../../../.storybook/juno-addon/themes"
import { addons } from "@storybook/preview-api"

// allows to implement themed components in the storybook
// component adjusts to the selected theme and enables tailwind classes.
export function JunoComponentParent(props) {
  // returns nothing if there is no child
  if (!props.children) {
    return
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

  return (
    <div>
      <StyleProvider
        key="decorator"
        stylesWrapper="shadowRoot"
        theme={parentTheme}
      >
        {props.children}
      </StyleProvider>
    </div>
  )
}
