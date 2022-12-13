import React from "react"
import {
  Button,
  ContentAreaToolbar,
  Container,
  IntroBox,
  Message,
  Spinner,
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridCell,
  TabPanel,
  CodeBlock,
} from "juno-ui-components"
import useStore from "./store"
import NewItemForm from "./components/NewItemForm"
import heroImage from "./img/app_bg_example.svg?url"
import { useQuery } from "react-query"
import { fetchAssetsManifest } from "./actions"
import { currentState, push } from "url-state-provider"

const AppContent = (props) => {
  const manifestUrl = useStore((state) => state.manifestUrl)
  const urlStateKey = useStore((state) => state.urlStateKey)

  const { isLoading, isError, data, error } = useQuery(
    ["assets", manifestUrl, {}],
    fetchAssetsManifest,
    {
      // enable the query also if the endpoint is set. For fetching local
      // data is not necessary since it should be empty
      // enabled: !!endpoint,
      // If set to Infinity, the data will never be considered stale
      //  until a browser reload is triggered
      staleTime: Infinity,
      // refer to this documentation to see more options
      // https://tanstack.com/query/v4/docs/guides/queries
    }
  )

  const openNewItemForm = () => {
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, newItemFormOpened: true })
  }

  if (isLoading) return <Spinner variant="primary" />
  if (isError)
    return (
      <Message variant="danger">{`${error.statusCode}, ${error.message}`}</Message>
    )

  return (
    <DataGrid columns={6}>
      <DataGridRow>
        <DataGridHeadCell>Name</DataGridHeadCell>
        <DataGridHeadCell>Type</DataGridHeadCell>
        <DataGridHeadCell>Version</DataGridHeadCell>
        <DataGridHeadCell>Entry File</DataGridHeadCell>
        <DataGridHeadCell>Entry Dir</DataGridHeadCell>
        <DataGridHeadCell>Updated At</DataGridHeadCell>
      </DataGridRow>
      {Object.keys(data)
        .sort()
        .map((assetName, i) =>
          Object.keys(data[assetName])
            .sort()
            .map((version, j) => (
              <DataGridRow key={`${i}-${j}`}>
                <DataGridCell>{j === 0 ? assetName : ""}</DataGridCell>
                <DataGridCell>
                  {j === 0 ? data[assetName][version]["type"] : ""}
                </DataGridCell>
                <DataGridCell>{version}</DataGridCell>
                <DataGridCell>
                  {data[assetName][version]["entryFile"]}
                </DataGridCell>
                <DataGridCell>
                  {data[assetName][version]["entryDir"]}
                </DataGridCell>
                <DataGridCell>
                  {data[assetName][version]["updatedAt"]}
                </DataGridCell>
              </DataGridRow>
            ))
        )}
    </DataGrid>
  )
}

export default AppContent
