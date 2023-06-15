import React from "react"
import CCloudShape from "../../assets/ccloud_shape.svg"
import SupernovaIcon from "../../assets/juno_supernova.svg"
import DoopIcon from "../../assets/juno_doop.svg"
import HeurekaIcon from "../../assets/juno_heureka.svg"
import { Icon, Stack, Button } from "juno-ui-components"
import {
  useAuthData,
  useAuthLoggedIn,
  useAppsActions,
  useAppsConfig,
  useAppsActive,
  useAuthActions,
} from "../../hooks/useStore"
import Avatar from "../Avatar"

const AppIcon = ({ name }) => {
  switch (name) {
    case "supernova":
      return <SupernovaIcon />
    case "doop":
      return <DoopIcon />
    case "heureka":
      return <HeurekaIcon />
    default:
      return <Icon icon="autoAwesomeMosaic" />
  }
}

const navStyles = `
bg-juno-grey-blue-11
py-4
`

const navItem = (active) => {
  return `
  px-2
  py-3
  w-full
  hover:text-theme-high

  ${
    active &&
    `
      bg-theme-global-bg  
      border-text-theme-light
      border-l-4
      text-white
      hover:text-white
    `
  }
`
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

const PluginNav = () => {
  const authData = useAuthData()
  const loggedIn = useAuthLoggedIn()
  const { login, logout } = useAuthActions()
  const { setActive: setActiveApps } = useAppsActions()
  const appsConfig = useAppsConfig()
  const activeApps = useAppsActive()

  return (
    <Stack
      direction="vertical"
      alignment="center"
      className={`greenhouse-nav ${navStyles}`}
    >
      <Stack
        direction="vertical"
        alignment="center"
        className={`greenhouse-logo ${logoStyles}`}
      >
        <CCloudShape />
        <span className={logoText}>
          GREEN
          <br />
          HOUSE
        </span>
      </Stack>
      {Object.values(appsConfig)
        .filter((a) => a.navigable)
        .map((appConf, i) => (
          <Stack
            key={i}
            direction="vertical"
            alignment="center"
            className={`greenhouse-nav-item ${navItem(
              activeApps.indexOf(appConf.id) >= 0
            )}`}
            role="button"
            tabIndex="0"
            onClick={() => setActiveApps([appConf.id])}
          >
            <AppIcon name={appConf.name} />
            <span className={appNameStyles}>{appConf.id}</span>
          </Stack>
        ))}

      <Stack
        direction="vertical"
        gap="3"
        alignment="center"
        className="mt-4 py-4 border-theme-background-lvl-1 border-t-2"
      >
        {loggedIn ? (
          <>
            <Avatar
              url={authData?.parsed?.avatarUrl.small}
              userID={authData?.parsed?.loginName}
            />
            <Button variant="subdued" size="small" onClick={() => logout()}>
              logout
            </Button>
          </>
        ) : (
          <Button size="small" onClick={() => login()}>
            Login
          </Button>
        )}
      </Stack>
    </Stack>
  )
}

export default PluginNav
