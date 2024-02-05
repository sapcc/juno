import {
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridCell,
  Icon,
} from "juno-ui-components"
import React from "react"

const BuildLog = ({ data }) => {
  // unique list of data by name and version
  data = data
    .filter(
      (v, i, a) =>
        a.findIndex((t) => t.name === v.name && t.version === v.version) === i
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div>
      <DataGrid columns={4} minContentColumns={[0]}>
        <DataGridRow>
          <DataGridHeadCell></DataGridHeadCell>
          <DataGridHeadCell>Name</DataGridHeadCell>
          <DataGridHeadCell>Version</DataGridHeadCell>
          <DataGridHeadCell>Status</DataGridHeadCell>
          {/* <DataGridHeadCell>Files</DataGridHeadCell> */}
        </DataGridRow>
        {data &&
          data.map((asset, i) => (
            <DataGridRow key={i}>
              <DataGridCell>
                {asset.status === "passed" ? (
                  <Icon
                    color="jn-text-theme-success"
                    icon="success"
                    onClick={function noRefCheck() {}}
                  />
                ) : (
                  <Icon
                    color="jn-text-theme-warning"
                    icon="warning"
                    onClick={function noRefCheck() {}}
                  />
                )}
              </DataGridCell>
              <DataGridCell>{asset.name}</DataGridCell>
              <DataGridCell>{asset.version}</DataGridCell>
              <DataGridCell>{asset.status}</DataGridCell>
              {/* <DataGridCell>
                <ul>
                  <li>
                    <a href={`/build-log/${asset.log}/report.txt`}>Report</a>
                  </li>
                  <li>
                    <a href={`/build-log/${asset.log}/screenshot`}>
                      Scrennshot
                    </a>
                  </li>
                  <li>
                    <a href={`/build-log/${asset.log}/video`}>Video</a>
                  </li>
                </ul>
              </DataGridCell> */}
            </DataGridRow>
          ))}
      </DataGrid>
    </div>
  )
}

export default BuildLog
