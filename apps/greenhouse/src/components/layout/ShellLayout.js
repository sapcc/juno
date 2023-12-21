import React from "react"
import PluginNav from "../nav/PluginNav"
import { useDemoMode } from "../../components/StoreProvider"

const shellStyles = `
  grid
  grid-cols-[max-content_auto]
  grid-rows-[minmax(100vh,100%)]
`

const mainStyles = `
  py-4
  pl-4
  bg-theme-global-bg
  h-full
`

const ShellLayout = ({ children }) => {
  const demoMode = useDemoMode()

  return (
    <div className={`greenhouse-shell ${shellStyles}`}>
      <PluginNav />
      <div>
        {demoMode && (
          <div className="bg-theme-accent/30 py-2 px-4">
            Welcome to the Greenhouse demo system! We're glad you're here! Just
            a quick heads up: you won't find any live data here. Enjoy
            exploring!
          </div>
        )}
        <div className={`greenhouse-main ${mainStyles}`}>{children}</div>
      </div>
    </div>
  )
}

export default ShellLayout
