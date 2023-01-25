import React, { useState, useMemo, useEffect } from "react"
import {
  Container,
  SideNavigation,
  SideNavigationItem,
  Stack,
  SelectRow,
  SelectOption,
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
  const [widgetLoaderVersion, setWidgetLoaderVersion] = useState()

  const nav = useMemo(() => {
    if (!data?.readme || !origin) return
    return {
      about: {
        label: "About",
        path: `${origin}${data?.readme}`,
      },
      wigetLoader: {
        label: "Widget Loader",
        path: `${origin}${
          data["widget-loader"]?.[widgetLoaderVersion || "latest"]?.readme
        }`,
      },
    }
  }, [data, origin, widgetLoaderVersion])

  useEffect(() => {
    if (urlState?.navItem) setActiveNavItem(urlState?.navItem)
    if (urlState?.widgetLoaderVersion)
      setWidgetLoaderVersion(urlState?.widgetLoaderVersion)
  }, [urlState])

  const onNavItemClicked = (value) => {
    const urlState = currentState(urlStateKey)
    push(urlStateKey, {
      ...urlState,
      navItem: value,
      // reset widget loader version to latest
      widgetLoaderVersion: widgetLoaderVersions[0].value,
    })
    setActiveNavItem(value)
  }

  // ################ VERSIONS ####################
  const widgetLoaderVersions = React.useMemo(() => {
    if (!data?.["widget-loader"]) return null

    const versionMap = Object.keys(data["widget-loader"]).reduce(
      (map, version) => {
        map[data["widget-loader"][version]?.version] =
          version === "latest"
            ? `latest (${data["widget-loader"][version]?.version})`
            : version
        return map
      },
      {}
    )
    return Object.keys(versionMap)
      .sort((a, b) => (a > b ? -1 : b < a ? 1 : 0))
      .map((version) => ({ value: version, label: versionMap[version] }))
  }, [data?.["widget-loader"]])

  const changeVersion = React.useCallback(
    (version) => {
      setWidgetLoaderVersion(version)
      const urlState = currentState(urlStateKey)
      push(urlStateKey, { ...urlState, widgetLoaderVersion: version })
    },
    [urlStateKey, currentState]
  )

  //############### END ###################

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
              {activeNavItem === "wigetLoader" && widgetLoaderVersions && (
                <Stack distribution="end">
                  <SelectRow
                    label="version"
                    variant="floating"
                    onChange={(e) => changeVersion(e.target.value)}
                  >
                    {widgetLoaderVersions.map((version, i) => (
                      <SelectOption
                        key={i}
                        selected={widgetLoaderVersion === version.value}
                        label={version.label}
                        value={version.value}
                      />
                    ))}
                  </SelectRow>
                </Stack>
              )}
              <Markdown path={nav?.[activeNavItem]?.path} />
            </Container>
          </Stack>
        )}
      </>
    )
  }, [activeNavItem, nav])
}

export default Documentation
