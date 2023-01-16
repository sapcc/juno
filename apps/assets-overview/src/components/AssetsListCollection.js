import React from "react"
import { DataGrid, DataGridRow, DataGridCell } from "juno-ui-components"

const gridCellCss = (isLastRow) => {
  return `
			${isLastRow && `border-b-0`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const AssetsListCollection = ({ name, collection }) => {
  console.log("collection: ", collection)

  return (
    <>
      <DataGridRow>
        <DataGridCell>{name}</DataGridCell>
        <DataGridCell colSpan={3} className="py-0">
          {collection &&
            collection.map((asset, i, arr) => (
              <DataGrid columns={3} key={i}>
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
                </DataGridRow>
              </DataGrid>
            ))}
        </DataGridCell>
      </DataGridRow>
    </>
  )
}

export default AssetsListCollection
