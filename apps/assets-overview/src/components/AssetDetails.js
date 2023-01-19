import React, { useState, useEffect, useMemo } from "react"
import {
  Button,
  Panel,
  PanelBody,
  PanelFooter,
  Spinner,
  Stack,
  MainTabs,
  TabList,
  Tab,
  TabPanel,
} from "juno-ui-components"
import useStore from "../store"
import { currentState, push, addOnChangeListener } from "url-state-provider"
import { useQuery } from "react-query"
import { fetchAssetsManifest } from "../actions"
import { APP } from "../helpers"
import AssetDetailsReadme from "./AssetDetailsReadme"
import AssetDetailsScripttag from "./AssetDetailsScripttag"
import AssetDetailsAdvanced from "./AssetDetailsAdvanced"
import { MessagesProvider } from "messages-provider"

const AssetDetailsFooter = ({ onCancelCallback }) => {
  return (
    <PanelFooter>
      <Button variant="subdued" onClick={onCancelCallback}>
        Close
      </Button>
    </PanelFooter>
  )
}

const AssetDetails = () => {
  const manifestUrl = useStore((state) => state.manifestUrl)
  const urlStateKey = useStore((state) => state.urlStateKey)
  const urlState = currentState(urlStateKey)
  const [opened, setOpened] = useState(false)
  const [assetName, setAssetName] = useState(null)
  const [assetVersion, setAssetVersion] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)

  // TODO display error
  const { isLoading, isError, data, error } = useQuery(
    manifestUrl,
    fetchAssetsManifest,
    {
      enabled: !!manifestUrl,
      staleTime: Infinity,
    }
  )

  const asset = useMemo(() => {
    if (!data) return null
    if (!assetName || !assetVersion) return null

    // TODO find a cheaper way to find the asset
    let result = {}
    Object.keys(data).forEach((name) => {
      if (name === assetName) {
        Object.keys(data[name]).forEach((version) => {
          if (version === assetVersion) {
            result = { ...data[name][version], name: name, version: version }
          }
        })
      }
    })
    return result
  }, [data, assetName, assetVersion])

  const updatePanelStateFromURL = (newState) => {
    setOpened(newState?.panelOpened)
    setAssetName(newState?.assetName)
    setAssetVersion(newState?.assetVersion)
    if (newState?.panelTabIndex) setTabIndex(newState?.panelTabIndex)
  }

  // wait until the global state is set to fetch the url state
  useEffect(() => {
    updatePanelStateFromURL(urlState)
  }, [urlStateKey])

  // call close reducer from url store
  const onClose = () => {
    // remove assetName,assetVersion and panelTabIndex
    // key from object
    const { assetName, assetVersion, panelTabIndex, ...restOfKeys } = urlState

    push(urlStateKey, {
      ...restOfKeys,
      panelOpened: false,
    })
    // since the panel is cached reset following values
    setTabIndex(0)
  }

  // this listener reacts on any change on the url state
  addOnChangeListener(urlStateKey, (newState) => {
    updatePanelStateFromURL(newState)
  })

  const length = useMemo(() => {
    if (!asset) return 0
    return Object.keys(asset).length
  }, [asset])

  const onTabSelected = (index) => {
    setTabIndex(index)
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, panelTabIndex: index })
  }

  return (
    <Panel
      heading={`${assetName} - ${assetVersion}`}
      opened={opened}
      onClose={onClose}
    >
      <PanelBody footer={<AssetDetailsFooter onCancelCallback={onClose} />}>
        {isLoading && !asset ? (
          <Stack className="pt-2" alignment="center">
            <Spinner variant="primary" />
            Loading asset...
          </Stack>
        ) : (
          <>
            {length > 0 ? (
              <MainTabs selectedIndex={tabIndex} onSelect={onTabSelected}>
                <TabList>
                  <Tab>Readme</Tab>
                  {asset?.type === APP && <Tab>Script tag</Tab>}
                  <Tab>Advance</Tab>
                </TabList>
                <TabPanel>
                  <MessagesProvider>
                    <AssetDetailsReadme asset={asset} />
                  </MessagesProvider>
                </TabPanel>
                {asset?.type === APP && (
                  <TabPanel>
                    <AssetDetailsScripttag asset={asset} />
                  </TabPanel>
                )}
                <TabPanel>
                  <AssetDetailsAdvanced asset={asset} />
                </TabPanel>
              </MainTabs>
            ) : (
              <span>No asset found</span>
            )}
          </>
        )}
      </PanelBody>
    </Panel>
  )
}

export default AssetDetails
