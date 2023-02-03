import React from "react"
import CCloudShape from "../../assets/ccloud_shape.svg"
import { Icon, Stack } from "juno-ui-components"

const ShellLayout = ({children}) => {

  const shellStyles = `
    grid
    grid-cols-[80px_auto]
    grid-rows-[minmax(100vh,100%)]
  `

  const navStyles = `
    bg-juno-grey-blue-11
    py-4
  `

  const navItem = (active) => {
    return (`
      px-2
      py-3
      w-full
      hover:text-theme-high

      ${active && 
        `
          bg-theme-global-bg
          text-white
          hover:text-white
        `
      }
    `)
  }

  const logoStyles = `
    pb-1
  `

  const logoText = `
    py-2
    font-bold
    text-sm
    leading-4
  `

  const appIconStyles = `
    
  `

  const appNameStyles = `
    text-xs
    break-all
  `

  const mainStyles = `
    py-4
    pl-4
  `



  return (
    <div className={`greenhouse-shell ${shellStyles}`}>
      <Stack direction="vertical" alignment="center" className={`greenhouse-nav ${navStyles}`}>
        <Stack direction="vertical" alignment="center" className={`greenhouse-logo ${logoStyles}`}>
          <CCloudShape />
          <span className={logoText}>
            GREEN<br />HOUSE
          </span>
        </Stack>
        <Stack direction="vertical" alignment="center" className={`greenhouse-nav-item ${navItem(true)}`} role="button" tabIndex="0">
          <Icon icon="autoAwesomeMosaic" size="32" className={appIconStyles} />
          <span className={appNameStyles}>Supernova</span>
        </Stack>
        <Stack direction="vertical" alignment="center" className={`greenhouse-nav-item ${navItem(false)}`} role="button" tabIndex="0">
          <Icon icon="autoAwesomeMosaic" size="32" className={appIconStyles} />
          <span className={appNameStyles}>Doop</span>
        </Stack>
        <Stack direction="vertical" alignment="center" className={`greenhouse-nav-item ${navItem(false)}`} role="button" tabIndex="0">
          <Icon icon="autoAwesomeMosaic" size="32" className={appIconStyles} />
          <span className={appNameStyles}>Heureka</span>
        </Stack>
      </Stack>
      <div className={`greenhouse-main ${mainStyles}`}>
        {children}
      </div>
    </div>
  )
}

export default ShellLayout