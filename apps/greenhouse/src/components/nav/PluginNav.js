import React from "react"
import CCloudShape from "../../assets/ccloud_shape.svg"
import SupernovaIcon from "../../assets/juno_supernova.svg"
import DoopIcon from "../../assets/juno_doop.svg"
import HeurekaIcon from "../../assets/juno_heureka.svg"
import { Icon, Stack } from "juno-ui-components"

const PluginNav = () => {

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

  return (
    <Stack direction="vertical" alignment="center" className={`greenhouse-nav ${navStyles}`}>
      <Stack direction="vertical" alignment="center" className={`greenhouse-logo ${logoStyles}`}>
        <CCloudShape />
        <span className={logoText}>
          GREEN<br />HOUSE
        </span>
      </Stack>
      <Stack direction="vertical" alignment="center" className={`greenhouse-nav-item ${navItem(true)}`} role="button" tabIndex="0">
        <SupernovaIcon />
        <span className={appNameStyles}>Supernova</span>
      </Stack>
      <Stack direction="vertical" alignment="center" className={`greenhouse-nav-item ${navItem(false)}`} role="button" tabIndex="0">
        <DoopIcon />
        <span className={appNameStyles}>Doop</span>
      </Stack>
      <Stack direction="vertical" alignment="center" className={`greenhouse-nav-item ${navItem(false)}`} role="button" tabIndex="0">
        <HeurekaIcon />
        <span className={appNameStyles}>Heureka</span>
      </Stack>
    </Stack>
  )
}

export default PluginNav