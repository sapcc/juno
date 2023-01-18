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

const AssetDetailsFooter = ({ onCancelCallback }) => {
  return (
    <PanelFooter>
      <Button variant="subdued" onClick={onCancelCallback}>
        Close
      </Button>
    </PanelFooter>
  )
}

const scriptTag = ({ srcEnv, name, version, appProps }) => {
  const newSrcEnv = srcEnv || "qa-de-1"
  let newAppProps = ""
  if (appProps && typeof appProps === "object") {
    Object.keys(appProps).forEach((key, index) => {
      newAppProps = `${newAppProps}${
        index ? "\n" : ""
      }  data-props-${key}="<fill_me>"`
    })
  }
  return `<script
  defer
  src="https://assets.juno.${newSrcEnv}.cloud.sap/apps/widget-loader@latest/build/app.js" 
  data-name="${name}"
  data-version="${version || "latest"}"
${newAppProps}>
</script>`
}

const AssetDetails = () => {
  const manifestUrl = useStore((state) => state.manifestUrl)
  const urlStateKey = useStore((state) => state.urlStateKey)
  const urlState = currentState(urlStateKey)
  const [opened, setOpened] = useState(false)
  const [assetName, setAssetName] = useState(null)
  const [assetVersion, setAssetVersion] = useState(null)

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

  // wait until the global state is set to fetch the url state
  useEffect(() => {
    setOpened(urlState?.assetDetailsOpened)
    setAssetName(urlState?.assetDetailsName)
    setAssetVersion(urlState?.assetDetailsVersion)
  }, [urlStateKey])

  // call close reducer from url store
  const onClose = () => {
    push(urlStateKey, { ...urlState, assetDetailsOpened: false })
  }

  // this listener reacts on any change on the url state
  addOnChangeListener(urlStateKey, (newState) => {
    setOpened(newState?.assetDetailsOpened)
    setAssetName(newState?.assetDetailsName)
    setAssetVersion(newState?.assetDetailsVersion)
  })

  const length = useMemo(() => {
    if (!asset) return 0
    return Object.keys(asset).length
  }, [asset])

  // TODO save state of the tabs
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
              <MainTabs>
                <TabList>
                  <Tab>Readme</Tab>
                  {asset?.type === APP && <Tab>Script tag</Tab>}
                  <Tab>Advance</Tab>
                </TabList>
                <TabPanel>
                  <AssetDetailsReadme asset={asset} />
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
