import React, { useState, useEffect, useMemo } from "react"
import { Button, Panel, PanelBody, PanelFooter } from "juno-ui-components"
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
    if (!data) return {}

    // Object.keys(data)
    //   .filter((key) => obj[key] instanceof Object)
    //   .map((key) => objectDeepKeys(obj[key]).map((k) => `${key}.${k}`))
    //   .reduce((x, y) => x.concat(y), Object.keys(obj))

    // Object.keys(data).forEach((name) => {
    //   Object.keys(data[name]).forEach((version) => {
    //     })
    //   })
    // })

    return {}
  }, [data])

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

  return (
    <Panel
      heading={`${assetName} - ${assetVersion}`}
      opened={opened}
      onClose={onClose}
    >
      <PanelBody footer={<AssetDetailsFooter onCancelCallback={onClose} />}>
        <div>Panel Content here</div>
      </PanelBody>
    </Panel>
  )
}

export default AssetDetails
