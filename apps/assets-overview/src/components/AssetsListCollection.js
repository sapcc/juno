import React, { useState } from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"
import { useFloating, useHover, useInteractions } from "@floating-ui/react"
import AssetsListCollectionItem from "./AssetsListCollectionItem"

const assetCellCss = (hightlight) => {
  return `
			${hightlight && `text-theme-accent`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const AssetsListCollection = ({ name, collection }) => {
  const [hightlight, setHightlight] = useState(false)

  const { reference, context } = useFloating({
    onOpenChange: setHightlight,
  })
  const hover = useHover(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <>
      <DataGridRow>
        <DataGridCell className={assetCellCss(hightlight)}>{name}</DataGridCell>
        <DataGridCell colSpan={3} className="py-0">
          <div ref={reference} {...getReferenceProps()}>
            {collection &&
              collection.map((asset, i, arr) => (
                <AssetsListCollectionItem
                  key={i}
                  asset={asset}
                  isLastItem={arr.length - 1 === i}
                />
              ))}
          </div>
        </DataGridCell>
      </DataGridRow>
    </>
  )
}

export default AssetsListCollection
