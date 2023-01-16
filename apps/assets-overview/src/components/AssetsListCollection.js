import React from "react"
import { DataGrid, DataGridRow, DataGridCell, Icon } from "juno-ui-components"
import { currentState, push } from "url-state-provider"
import useStore from "../store"

const gridCellCss = (isLastRow) => {
  return `
			${isLastRow && `border-b-0`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const AssetsListCollection = ({ name, collection }) => {
  const urlStateKey = useStore((state) => state.urlStateKey)

  const onShowDetails = (asset) => {
    console.log("asset: ", asset)
    const urlState = currentState(urlStateKey)
    push(urlStateKey, {
      ...urlState,
      assetDetailsOpened: true,
      assetDetailsName: asset?.name,
      assetDetailsVersion: asset?.version,
    })
  }

  return (
    <>
      <DataGridRow>
        <DataGridCell>{name}</DataGridCell>
        <DataGridCell colSpan={4} className="py-0">
          {collection &&
            collection.map((asset, i, arr) => (
              <DataGrid columns={4} key={i}>
                <DataGridRow>
                  <DataGridCell className={gridCellCss(arr.length - 1 === i)}>
                    {asset?.version}
                  </DataGridCell>
                  <DataGridCell className={gridCellCss(arr.length - 1 === i)}>
                    {asset?.updatedAt}
                  </DataGridCell>
                  <DataGridCell className={gridCellCss(arr.length - 1 === i)}>
                    {asset?.sizeHuman}
                  </DataGridCell>
                  <DataGridCell className={gridCellCss(arr.length - 1 === i)}>
                    <Icon
                      icon="description"
                      onClick={() => onShowDetails(asset)}
                    />
                  </DataGridCell>
                </DataGridRow>
              </DataGrid>
            ))}
        </DataGridCell>
      </DataGridRow>
    </>
  )
}

export default AssetsListCollection
