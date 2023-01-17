import React from "react"
import { DataGrid, DataGridRow, DataGridCell } from "juno-ui-components"
import useStore from "../store"
import { currentState, push } from "url-state-provider"
import { DateTime } from "luxon"

const collectionCellCss = (isLastRow) => {
  return `
			${isLastRow && `border-b-0`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const collectionRowCss = `
  hover:text-theme-accent
`

const AssetsListCollectionItem = ({ asset, isLastItem }) => {
  const urlStateKey = useStore((state) => state.urlStateKey)

  //
  // custom vars
  //
  const updatedAt = React.useMemo(() => {
    if (!asset.updatedAt) return "No date available"
    return DateTime.fromISO(asset.updatedAt).toLocaleString(
      DateTime.DATETIME_MED
    )
  }, [asset?.updatedAt])

  //
  // Callbacks
  //
  const onShowDetails = () => {
    const urlState = currentState(urlStateKey)
    push(urlStateKey, {
      ...urlState,
      assetDetailsOpened: true,
      assetDetailsName: asset?.name,
      assetDetailsVersion: asset?.version,
    })
  }

  return (
    <DataGrid columns={3}>
      <DataGridRow className={collectionRowCss} onClick={onShowDetails}>
        <DataGridCell className={collectionCellCss(isLastItem)}>
          {asset?.version}
        </DataGridCell>
        <DataGridCell className={collectionCellCss(isLastItem)}>
          {updatedAt}
        </DataGridCell>
        <DataGridCell className={collectionCellCss(isLastItem)}>
          {asset?.sizeHuman}
        </DataGridCell>
      </DataGridRow>
    </DataGrid>
  )
}

export default AssetsListCollectionItem
