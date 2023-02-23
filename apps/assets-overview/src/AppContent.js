import React, { useState, useEffect, useMemo } from "react"
import { TabPanel, MainTabs, TabList, Tab } from "juno-ui-components"
import useStore from "./store"
import { useQuery } from "@tanstack/react-query"
import { fetchAssetsManifest } from "./actions"
import { currentState, push } from "url-state-provider"
import TabContainer from "./components/TabContainer"
import AssetsList from "./components/AssetsList"
import AssetDetails from "./components/AssetDetails"
import { APP, LIB } from "./helpers"
import { useMessageStore } from "messages-provider"
import { parseError } from "./helpers"
import Documentation from "./components/Documentation"

const AppContent = (props) => {
  const addMessage = useMessageStore((state) => state.addMessage)
  const manifestUrl = useStore((state) => state.manifestUrl)
  const urlStateKey = useStore((state) => state.urlStateKey)
  const setOrigin = useStore((state) => state.setOrigin)
  const [tabIndex, setTabIndex] = useState(0)

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["manifest", manifestUrl],
    queryFn: fetchAssetsManifest,
    enabled: !!manifestUrl,
    staleTime: Infinity,
  })

  // if error send error to the message store
  useEffect(() => {
    if (error) {
      addMessage({
        variant: "error",
        text: parseError(error),
      })
    }
  }, [error])

  // save the root path to use for fetching
  useEffect(() => {
    if (data) {
      setOrigin(data?._global?.baseUrl)
    }
  }, [data])

  const [globals, apps, libs] = useMemo(() => {
    if (!data) return [null, null, null]

    let { _global, ...assets } = data
    const apps = {}
    const libs = {}

    for (const [name, versions] of Object.entries(assets)) {
      const type = versions["latest"]?.type
      if (type === "app") apps[name] = assets[name]
      else if (type === "lib") libs[name] = assets[name]
    }

    return [_global, apps, libs]
  }, [data])

  // wait until the global state is set to fetch the url state
  useEffect(() => {
    const urlState = currentState(urlStateKey)
    if (urlState?.tabIndex) setTabIndex(urlState?.tabIndex)
  }, [urlStateKey])

  // when switching tags reset the navItem
  const onTabSelected = (index) => {
    setTabIndex(index)
    const urlState = currentState(urlStateKey)
    push(urlStateKey, {
      ...urlState,
      tabIndex: index,
      navItem: "",
      panelOpened: false,
    })
  }

  return (
    <>
      <AssetDetails />
      <MainTabs selectedIndex={tabIndex} onSelect={onTabSelected}>
        <TabList>
          <Tab>Documentation</Tab>
          <Tab>Apps</Tab>
          <Tab>Libs</Tab>
        </TabList>
        <TabPanel>
          <TabContainer>
            <Documentation isLoading={isLoading} data={globals} error={error} />
          </TabContainer>
        </TabPanel>
        <TabPanel>
          <TabContainer>
            <AssetsList isLoading={isLoading} assets={apps} error={error} />
          </TabContainer>
        </TabPanel>
        <TabPanel>
          <TabContainer>
            <AssetsList isLoading={isLoading} assets={libs} error={error} />
          </TabContainer>
        </TabPanel>
      </MainTabs>
    </>
  )
}

export default AppContent
