import React, { useState, useEffect, useMemo } from "react"
import { TabPanel, MainTabs, TabList, Tab } from "juno-ui-components"
import useStore from "./store"
import { useQuery } from "react-query"
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

  const { isLoading, isError, data, error } = useQuery(
    ["manifest", manifestUrl],
    fetchAssetsManifest,
    {
      enabled: !!manifestUrl,
      staleTime: Infinity,
    }
  )

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

  const [apps, libs, globals] = useMemo(() => {
    if (!data) return [null, null, null]
    let apps = {}
    let libs = {}
    let globals = {}
    // get the globals

    if (data._global) {
      globals = data._global
    }

    // sort apps and libs and add name and version to the object
    Object.keys(data).forEach((name) => {
      Object.keys(data[name]).forEach((version) => {
        const assetItem = {
          ...data[name][version],
          version: version,
          name: name,
        }
        if (assetItem?.type === APP) {
          if (!apps[name]) apps[name] = []
          apps[name].push(assetItem)
        }
        if (assetItem?.type === LIB) {
          if (!libs[name]) libs[name] = []
          libs[name].push(assetItem)
        }
      })
    })
    apps = Object.keys(apps)
      .sort()
      .reduce((obj, key) => {
        obj[key] = apps[key]
        return obj
      }, {})

    libs = Object.keys(libs)
      .sort()
      .reduce((obj, key) => {
        obj[key] = libs[key]
        return obj
      }, {})

    return [apps, libs, globals]
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
    push(urlStateKey, { ...urlState, tabIndex: index, navItem: "" })
  }

  return (
    <>
      <AssetDetails />
      <MainTabs selectedIndex={tabIndex} onSelect={onTabSelected}>
        <TabList>
          <Tab>Apps</Tab>
          <Tab>Libs</Tab>
          <Tab>Documentation</Tab>
        </TabList>
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
        <TabPanel>
          <TabContainer>
            <Documentation isLoading={isLoading} data={globals} error={error} />
          </TabContainer>
        </TabPanel>
      </MainTabs>
    </>
  )
}

export default AppContent
