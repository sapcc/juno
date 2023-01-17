import React, { useState, useEffect, useMemo } from "react"
import {
  Button,
  Panel,
  PanelBody,
  PanelFooter,
  CodeBlock,
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridCell,
  Stack,
} from "juno-ui-components"
import useStore from "../store"
import { currentState, push, addOnChangeListener } from "url-state-provider"
import { useQuery } from "react-query"
import { fetchAssetsManifest } from "../actions"
import { APP } from "../helpers"

const sectionCss = `
mt-6
`

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

  // TODO: if asset is just {} display not found
  return (
    <Panel
      heading={`${assetName} - ${assetVersion}`}
      opened={opened}
      onClose={onClose}
    >
      <PanelBody footer={<AssetDetailsFooter onCancelCallback={onClose} />}>
        {asset?.type === APP && (
          <>
            <h1 className="font-bold text-xl">Data props</h1>
            <DataGrid className={sectionCss} columns={2}>
              <DataGridRow>
                <DataGridHeadCell>Name</DataGridHeadCell>
                <DataGridHeadCell>Description</DataGridHeadCell>
              </DataGridRow>
              {asset?.appProps && Object.keys(asset?.appProps).length > 0 ? (
                <>
                  {Object.keys(asset?.appProps || {}).map((key, index) => (
                    <DataGridRow key={index}>
                      <DataGridCell>{key}</DataGridCell>
                      <DataGridCell>
                        {asset?.appProps[key]?.description}
                      </DataGridCell>
                    </DataGridRow>
                  ))}
                </>
              ) : (
                <DataGridRow>
                  <DataGridCell colSpan={2}>
                    <Stack
                      alignment="center"
                      distribution="center"
                      direction="vertical"
                      className="h-full"
                    >
                      <span>No props found</span>
                    </Stack>
                  </DataGridCell>
                </DataGridRow>
              )}
            </DataGrid>

            <CodeBlock className={sectionCss} heading="Script tag" lang="html">
              {scriptTag({
                name: assetName,
                version: assetVersion,
                appProps: asset?.appProps,
              })}
            </CodeBlock>
          </>
        )}
        <CodeBlock
          className={sectionCss}
          content={asset || {}}
          heading="Asset attributes"
          lang="json"
        />
      </PanelBody>
    </Panel>
  )
}

export default AssetDetails
