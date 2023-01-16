import React, { useState, useEffect, useMemo } from "react"
import {
  Button,
  Panel,
  PanelBody,
  PanelFooter,
  CodeBlock,
} from "juno-ui-components"
import useStore from "../store"
import { currentState, push, addOnChangeListener } from "url-state-provider"
import { useQuery } from "react-query"
import { fetchAssetsManifest } from "../actions"

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
        <CodeBlock
          content={asset || {}}
          heading="Asset properties"
          lang="json"
        />
      </PanelBody>
    </Panel>
  )
}

export default AssetDetails
