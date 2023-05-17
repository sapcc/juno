import React from "react"
import { DataGrid, DataGridRow, DataGridCell } from "juno-ui-components"
import useStore from "../store"
import { currentState, push } from "url-state-provider"
import { DateTime } from "luxon"

const AssetsListItem = ({ name, versions }) => {
  const urlStateKey = useStore((state) => state.urlStateKey)
  const { latest, ...otherVersions } = versions || {}
  const olderVersions = React.useMemo(() => {
    const keys = Object.keys(otherVersions)
    const index = keys.indexOf(latest?.version)
    if (index > -1) {
      // only splice array when item is found
      keys.splice(index, 1) // 2nd parameter means remove one item only
    }
    return keys.sort()
  }, [latest, otherVersions])

  //
  // custom vars
  //
  const updatedAt = React.useMemo(() => {
    if (!latest.updatedAt) return "No date available"
    return DateTime.fromISO(latest.updatedAt).toLocaleString(
      DateTime.DATETIME_MED
    )
  }, [latest?.updatedAt])

  //
  // Callbacks
  //
  const onShowDetails = React.useCallback(() => {
    const urlState = currentState(urlStateKey)
    // set  panelTabIndex: 0 to reset the tabs on changing asset
    // there is edge cases with the tab index due to the different
    // number of tabs depending on the asset type, preview and comunicator options
    push(urlStateKey, {
      ...urlState,
      panelOpened: true,
      assetName: name,
      assetVersion: latest?.version,
      panelTabIndex: 0,
    })
  }, [urlStateKey, name, latest?.version])

  return (
    <DataGridRow
      className="hover:text-theme-accent cursor-pointer"
      onClick={onShowDetails}
    >
      <DataGridCell>{name}</DataGridCell>
      <DataGridCell className="">
        {latest?.version}{" "}
        {olderVersions?.length > 0 && `(${olderVersions.length} more releases)`}
      </DataGridCell>
      <DataGridCell className="">{updatedAt}</DataGridCell>
      <DataGridCell className="">{latest.sizeHuman}</DataGridCell>
    </DataGridRow>
  )
}

export default AssetsListItem
