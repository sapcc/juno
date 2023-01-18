import React, { useMemo, useEffect } from "react"
import {
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridCell,
  Stack,
  Spinner,
} from "juno-ui-components"
import AssetsListCollection from "./AssetsListCollection"

const AssetsList = ({ assets, isLoading, error }) => {
  const length = useMemo(() => {
    if (!assets) return 0
    return Object.keys(assets).length
  }, [assets])

  return (
    <>
      {isLoading && !assets ? (
        <Stack className="pt-2" alignment="center">
          <Spinner variant="primary" />
          Loading assets...
        </Stack>
      ) : (
        <DataGrid columns={4}>
          <DataGridRow>
            <DataGridHeadCell>Name</DataGridHeadCell>
            <DataGridHeadCell>Version</DataGridHeadCell>
            <DataGridHeadCell>Updated At</DataGridHeadCell>
            <DataGridHeadCell>Size</DataGridHeadCell>
          </DataGridRow>
          {length > 0 ? (
            <>
              {Object.keys(assets).map((assetName, i) => (
                <AssetsListCollection
                  key={i}
                  name={assetName}
                  collection={assets[assetName]}
                />
              ))}
            </>
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
      )}
    </>
  )
}
export default AssetsList
