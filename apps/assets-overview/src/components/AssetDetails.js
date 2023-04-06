import React, { useState, useEffect, useMemo } from "react"
import {
  Button,
  Panel,
  PanelBody,
  PanelFooter,
  Spinner,
  Stack,
  MainTabs,
  Message,
  TabList,
  Tab,
  TabPanel,
  SelectRow,
  SelectOption,
} from "juno-ui-components"
import useStore from "../store"
import {
  currentState,
  push,
  addOnChangeListener,
  removeOnChangeListener,
} from "url-state-provider"
import { useQuery } from "@tanstack/react-query"
import { fetchAssetsManifest } from "../actions"
import { APP } from "../helpers"
import AssetDetailsMarkdown from "./AssetDetailsMarkdown"
import AssetDetailsScripttag from "./AssetDetailsScripttag"
import AssetDetailsAdvanced from "./AssetDetailsAdvanced"
import { MessagesProvider } from "messages-provider"
import { compareVersions } from "../helpers"

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

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["manifest", manifestUrl],
    queryFn: fetchAssetsManifest,
    enabled: !!manifestUrl,
    staleTime: Infinity,
  })

  const asset = useMemo(() => {
    if (!data) return null
    if (!assetName || !assetVersion) return null

    return { ...data[assetName][assetVersion], name: assetName }
  }, [data, assetName, assetVersion])

  // assets that this asset depends on
  const dependencies = React.useMemo(() => {
    if (!asset?.appDependencies) return []

    asset.appDependencies = { auth: "latest" }

    const deps = []
    for (let name in asset.appDependencies) {
      const version = asset.appDependencies[name]
      const app = data[name]?.[version]
      if (app) deps.push(app)
    }

    return deps
  }, [asset?.appDependencies])

  // wait until the global state is set to fetch the url state
  useEffect(() => {
    const updatePanelStateFromURL = (newState) => {
      setOpened(newState?.panelOpened)
      setAssetName(newState?.assetName)
      setAssetVersion(newState?.assetVersion)
      if (newState?.panelTabIndex) setTabIndex(newState?.panelTabIndex)
    }
    updatePanelStateFromURL(urlState)
    // this listener reacts on any change on the url state
    addOnChangeListener(urlStateKey, (newState) => {
      updatePanelStateFromURL(newState)
    })
    return () => removeOnChangeListener(urlStateKey)
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

  const length = useMemo(() => {
    if (!asset) return 0
    return Object.keys(asset).length
  }, [asset])

  const onTabSelected = (index) => {
    setTabIndex(index)
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, panelTabIndex: index })
  }

  // ############### VERSION HANDLING #################
  const versions = useMemo(() => {
    if (!data || !assetName) return null

    const versionMap = Object.keys(data[assetName]).reduce((map, version) => {
      map[data[assetName][version]?.version] =
        version === "latest"
          ? `latest (${data[assetName][version]?.version})`
          : version
      return map
    }, {})

    return Object.keys(versionMap)
      .sort(compareVersions())
      .reverse()
      .map((version) => ({ value: version, label: versionMap[version] }))
  }, [data, assetName])

  const isLatest = useMemo(() => {
    if (!data || !assetVersion) return null
    return assetVersion === data[assetName]["latest"]?.version
  }, [data, assetVersion])

  const changeVersion = React.useCallback(
    (version) => {
      setAssetVersion(version)
      const urlState = currentState(urlStateKey)
      push(urlStateKey, { ...urlState, assetVersion: version })
    },
    [urlStateKey, currentState]
  )
  //########### END ##############

  return (
    <Panel heading={assetName} opened={opened} onClose={onClose} size="large">
      <PanelBody footer={<AssetDetailsFooter onCancelCallback={onClose} />}>
        {isLoading && !asset ? (
          <Stack className="pt-2" alignment="center">
            <Spinner variant="primary" />
            Loading asset...
          </Stack>
        ) : (
          <>
            {versions && (
              <Stack distribution="end">
                <SelectRow
                  label="version"
                  variant="floating"
                  value={asset?.version}
                  onChange={(e) => changeVersion(e.target.value)}
                >
                  {versions.map((version, i) => (
                    <SelectOption
                      key={i}
                      label={version.label}
                      value={version.value}
                    />
                  ))}
                </SelectRow>
              </Stack>
            )}

            {/* TODO: use MessagesProvider instead */}
            {isError && (
              <Message
                dismissible
                text={error && error.toString()}
                variant="error"
              />
            )}

            {length > 0 ? (
              <MainTabs selectedIndex={tabIndex} onSelect={onTabSelected}>
                <TabList>
                  <Tab>Readme</Tab>
                  {asset?.communicatorReadme && <Tab>Communication</Tab>}
                  {asset?.type === APP && <Tab>Script tag</Tab>}
                  <Tab>Advance</Tab>
                </TabList>
                <TabPanel>
                  <MessagesProvider>
                    <AssetDetailsMarkdown path={asset?.readme} />
                  </MessagesProvider>
                </TabPanel>
                {asset?.communicatorReadme && (
                  <TabPanel>
                    <AssetDetailsMarkdown path={asset?.communicatorReadme} />
                  </TabPanel>
                )}
                {asset?.type === APP && (
                  <TabPanel>
                    <AssetDetailsScripttag
                      asset={asset}
                      isLatest={isLatest}
                      dependencies={dependencies}
                    />
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
