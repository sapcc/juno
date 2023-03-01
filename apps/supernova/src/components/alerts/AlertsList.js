import React, { useMemo } from "react"
import {
  DataGrid,
  DataGridHeadCell,
  DataGridRow,
  DataGridCell,
  Icon,
} from "juno-ui-components"
import { queryAlerts } from "../../queries"
import Alert from "./Alert"
import { FixedSizeList as List, VariableSizeGrid as Grid } from "react-window"

const AlertsList = () => {
  const sortAlerts = (items) => {
    return items.sort((a, b) => {
      if (
        (a.labels?.severity === "critical" &&
          b.labels?.severity !== "critical") ||
        (a.labels?.severity === "warning" &&
          ["critical", "warning"].indexOf(b.labels?.severity) < 0)
      )
        return -1
      else if (
        a.labels?.severity === b.labels?.severity &&
        a.status?.state !== b.status?.state &&
        a.status?.state
      )
        return a.status?.state.localeCompare(b.status?.state)
      else if (
        a.labels?.severity === b.labels?.severity &&
        a.status?.state === b.status?.state &&
        a.startsAt !== b.startsAt &&
        b.startsAt
      )
        return b.startsAt?.localeCompare(a.startsAt)
      else if (
        a.labels?.severity === b.labels?.severity &&
        a.status?.state === b.status?.state &&
        a.startsAt === b.startsAt &&
        a.labels?.region
      )
        return a.labels?.region?.localeCompare(b.labels?.region)
      else return 1
    })
  }

  const { isLoading, isError, data, error } = queryAlerts()

  // TODO: the sorting should probably not happen here but in the query action
  const alertsSorted = useMemo(() => {
    if (data) {
      return sortAlerts(data)
    }
  }, [data])

  const Row = React.useCallback(
    ({ index, style }) => (
      <div style={{ ...style, width: "100%" }}>
        <DataGridRow>
          <DataGridCell>
            <Icon icon="danger" />
          </DataGridCell>
          <DataGridCell>Region</DataGridCell>
          <DataGridCell>Service</DataGridCell>
          <DataGridCell>Description</DataGridCell>
          <DataGridCell>Firing Since</DataGridCell>
          <DataGridCell>Status</DataGridCell>
          <DataGridCell></DataGridCell>
        </DataGridRow>
      </div>
    ),
    [alertsSorted]
  )

  const Cell = React.useCallback(
    ({ columnIndex, rowIndex, style }) => {
      const alert = alertsSorted[rowIndex]
      const alertData = [
        "",
        alert.labels?.region,
        alert.labels?.service,
        alert.annotations?.summary,
        "Date",
        alert.status?.state,
        "Button",
      ]
      return <div style={style}>{alertData[columnIndex]}</div>
    },
    [alertsSorted]
  )

  const columnWidths = [80, 300, 80, 500, 100, 100, 100]

  return (
    <>
      <DataGrid columns={7} minContentColumns={[0, 2, 5]}>
        {!isLoading && (
          <DataGridRow>
            <DataGridHeadCell>
              <Icon icon="danger" />
            </DataGridHeadCell>
            <DataGridHeadCell>Region</DataGridHeadCell>
            <DataGridHeadCell>Service</DataGridHeadCell>
            <DataGridHeadCell>Description</DataGridHeadCell>
            <DataGridHeadCell>Firing Since</DataGridHeadCell>
            <DataGridHeadCell>Status</DataGridHeadCell>
            <DataGridHeadCell></DataGridHeadCell>
          </DataGridRow>
        )}

        {/* {alertsSorted?.map((alert) => (
          <Alert key={alert.fingerprint} alert={alert} />
        ))} */}
      </DataGrid>

      <Grid
        columnCount={7}
        columnWidth={(index) => columnWidths[index]}
        height={500}
        rowCount={alertsSorted?.length}
        rowHeight={() => 35}
        width={1300}
      >
        {Cell}
      </Grid>
    </>
  )
}

export default AlertsList
