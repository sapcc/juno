import React, { useState, useMemo, useEffect } from "react"
import {
  Container,
  SideNavigation,
  SideNavigationItem,
  Stack,
  Spinner,
} from "juno-ui-components"
import useStore from "../store"
import Markdown from "./Markdown"
import { currentState, push } from "url-state-provider"

const Documentation = ({ data }) => {
  const origin = useStore((state) => state.origin)
  const urlStateKey = useStore((state) => state.urlStateKey)
  const urlState = currentState(urlStateKey)
  const [activeNavItem, setActiveNavItem] = useState("about")

  const nav = useMemo(() => {
    if (!data?.readme || !origin) return
    return {
      about: {
        label: "About",
        path: `${origin}${data?.readme}`,
      },
      wigetLoader: {
        label: "Widget Loader",
        path: `${origin}${data["widget-loader"]?.latest?.readme}`,
      },
    }
  }, [data, origin])

  useEffect(() => {
    if (urlState?.navItem) setActiveNavItem(urlState?.navItem)
  }, [urlState])

  const onNavItemClicked = (value) => {
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, navItem: value })
    setActiveNavItem(value)
  }

  return useMemo(() => {
    return (
      <>
        {!nav ? (
          <Stack className="pt-2" alignment="center">
            <Spinner variant="primary" />
            Loading ...
          </Stack>
        ) : (
          <Stack alignmet="start" gap="5">
            <SideNavigation>
              {Object.keys(nav).map((key, index) => (
                <SideNavigationItem
                  key={index}
                  className="whitespace-nowrap"
                  active={activeNavItem === key}
                  label={nav[key]?.label}
                  onClick={() => onNavItemClicked(key)}
                />
              ))}
            </SideNavigation>
            <Container>
              <Markdown path={nav?.[activeNavItem]?.path} />
            </Container>
          </Stack>
        )}
      </>
    )
  }, [activeNavItem, nav])
}

export default Documentation
