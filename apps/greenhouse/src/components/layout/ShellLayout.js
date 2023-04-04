import React from "react"
import PluginNav from "../nav/PluginNav"

const shellStyles = `
  grid
  grid-cols-[80px_auto]
  grid-rows-[minmax(100vh,100%)]
`

const mainStyles = `
  py-4
  pl-4
  bg-theme-global-bg
`

const ShellLayout = ({ children }) => {
  return (
    <div className={`greenhouse-shell ${shellStyles}`}>
      <PluginNav />
      <div className={`greenhouse-main ${mainStyles}`}>{children}</div>
    </div>
  )
}

export default ShellLayout
