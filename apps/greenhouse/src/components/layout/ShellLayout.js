import React from "react"
import CCloudShape from "../../assets/ccloud_shape.svg"
import { Stack } from "juno-ui-components"

const ShellLayout = ({children}) => {

  const shellStyles = `
    grid
    grid-cols-[80px_auto]
    grid-rows-[100vh]
  `

  const navStyles = `
    bg-juno-grey-blue-11
    py-4
  `

  const logoText = `
    py-2
    font-bold
    leading-4
  `

  const mainStyles = `
    py-4
    pl-4
  `


  return (
    <div className={`greenhouse-shell ${shellStyles}`}>
      <Stack direction="vertical" alignment="center" className={`greenhouse-nav ${navStyles}`}>
        <Stack direction="vertical" alignment="center" className={`greenhouse-logo`}>
          <CCloudShape />
          <div className={logoText}>
            GREEN<br />HOUSE
          </div>
        </Stack>
      </Stack>
      <div className={`greenhouse-main ${mainStyles}`}>
        {children}
      </div>
    </div>
  )
}

export default ShellLayout