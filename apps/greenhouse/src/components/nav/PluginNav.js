import React from "react"
import CCloudShape from "../../assets/ccloud_shape.svg"
import SupernovaIcon from "../../assets/juno_supernova.svg"
import DoopIcon from "../../assets/juno_doop.svg"
import HeurekaIcon from "../../assets/juno_heureka.svg"
import { Icon, Stack, Button } from "juno-ui-components"
import useStore from "../../hooks/useStore"
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
      return <Icon />
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
  const auth = useStore((state) => state.auth)
  const setActive = useStore((state) => state.apps.setActive)
  const config = useStore((state) => state.apps.config)

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
      {Object.values(config)
        .filter((a) => a.navigable)
        .map((appConf, i) => (
          <Stack
            key={i}
            direction="vertical"
            alignment="center"
            className={`greenhouse-nav-item ${navItem(true)}`}
            role="button"
            tabIndex="0"
            onClick={() => setActive([appConf.name])}
          >
            <AppIcon name={appConf.name} />
            <span className={appNameStyles}>{appConf.name}</span>
          </Stack>
        ))}

      <Stack alignment="center">
        {auth?.loggedIn && (
          <Avatar
            url={auth.data?.avatarUrl.small}
            userID={auth.data?.login_name || auth.data?.subject}
          />
        )}
      </Stack>

      <Stack className="py-2">
        {auth?.loggedIn ? (
          <Button size="small" onClick={() => auth?.logout()}>
            logout
          </Button>
        ) : (
          <Button size="small" onClick={() => auth?.login()}>
            Login
          </Button>
        )}
      </Stack>
    </Stack>
  )
}

export default PluginNav
