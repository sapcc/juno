import React, { useMemo, useEffect } from "react"
import {
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridCell,
  Stack,
  Spinner,
} from "juno-ui-components"
import AssetsListItem from "./AssetsListItem"

const AssetsList = ({ assets, isLoading, error }) => {
  const size = React.useMemo(
    () => (assets ? Object.keys(assets).length : 0),
    [assets]
  )

  if (isLoading && !assets)
    return (
      <Stack className="pt-2" alignment="center">
        <Spinner variant="primary" />
        Loading assets...
      </Stack>
    )

  return (
    <DataGrid columns={4}>
      <DataGridRow>
        <DataGridHeadCell>Name</DataGridHeadCell>
        <DataGridHeadCell>Latest Version</DataGridHeadCell>
        <DataGridHeadCell>Updated At</DataGridHeadCell>
        <DataGridHeadCell>Size</DataGridHeadCell>
      </DataGridRow>
      {size > 0 ? (
        Object.keys(assets)
          .sort()
          .map((assetName, i) => (
            <AssetsListItem
              key={i}
              name={assetName}
              versions={assets[assetName]}
            />
          ))
      ) : (
        <DataGridRow>
          <DataGridCell colSpan={4}>
            <Stack
              alignment="center"
              distribution="center"
              direction="vertical"
              className="h-full"
            >
              <span>No assets found</span>
            </Stack>
          </DataGridCell>
        </DataGridRow>
      )}
    </DataGrid>
  )
}
export default AssetsList
