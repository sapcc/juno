import React, { useState } from "react"
import { DataGrid, DataGridRow, DataGridCell, Icon } from "juno-ui-components"
import { currentState, push } from "url-state-provider"
import useStore from "../store"

import { useFloating, useHover, useInteractions } from "@floating-ui/react"

const collectionCellCss = (isLastRow) => {
  return `
			${isLastRow && `border-b-0`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const assetCellCss = (hightlight) => {
  return `
			${hightlight && `text-theme-accent`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const collectionRowCss = `
  hover:text-theme-accent
`

const AssetsListCollection = ({ name, collection }) => {
  const urlStateKey = useStore((state) => state.urlStateKey)
  const [hightlight, setHightlight] = useState(false)

  const { reference, context } = useFloating({
    onOpenChange: setHightlight,
  })
  const hover = useHover(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

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
        <DataGridCell className={assetCellCss(hightlight)}>{name}</DataGridCell>
        <DataGridCell colSpan={3} className="py-0">
          <div ref={reference} {...getReferenceProps()}>
            {collection &&
              collection.map((asset, i, arr) => (
                <DataGrid columns={3} key={i}>
                  <DataGridRow
                    className={collectionRowCss}
                    onClick={() => onShowDetails(asset)}
                  >
                    <DataGridCell
                      className={collectionCellCss(arr.length - 1 === i)}
                    >
                      {asset?.version}
                    </DataGridCell>
                    <DataGridCell
                      className={collectionCellCss(arr.length - 1 === i)}
                    >
                      {asset?.updatedAt}
                    </DataGridCell>
                    <DataGridCell
                      className={collectionCellCss(arr.length - 1 === i)}
                    >
                      {asset?.sizeHuman}
                    </DataGridCell>
                  </DataGridRow>
                </DataGrid>
              ))}
          </div>
        </DataGridCell>
      </DataGridRow>
    </>
  )
}

export default AssetsListCollection
