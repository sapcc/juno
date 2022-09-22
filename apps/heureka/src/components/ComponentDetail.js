import React, { useCallback, useEffect, useMemo } from "react"
import {
  Icon,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Container,
} from "juno-ui-components"
import { useRouter } from "url-state-router"
import { getComponent } from "../queries"
import { useStore as useMessageStore } from "../messageStore"
import useStore from "../store"
import {
  usersListToString,
  componentDetailsByType,
  parseError,
} from "../helpers"
import VulnerabilitiesList from "./VulnerabilitiesList"
import PackagesList from "./PackagesList"
import {
  DetailSection,
  DetailContentHeading,
  DetailSectionHeader,
} from "../styles"
import HintLoading from "./HintLoading"
import HintNotFound from "./HintNotFound"

const DetailSectionTop = `
bg-theme-code-block
rounded-t
mb-0.5
`

const DetailSectionBottom = `
bg-theme-code-block
rounded-b
pb-0.5
`

const ComponentDetail = () => {
  const { options, routeParams } = useRouter()

  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const componentId = routeParams?.componentId
  const { isLoading, isError, isFetching, data, error } = getComponent(
    endpoint,
    componentId
  )

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (error) {
      setMessage({
        variant: "error",
        text: parseError(error),
      })
    }
  }, [error])

  const owners = useMemo(() => {
    if (!data?.Owners) return []
    return usersListToString(data.Owners)
  }, [data?.Owners])

  const operators = useMemo(() => {
    if (!data?.Operators) return []
    return usersListToString(data.Operators)
  }, [data?.Operators])

  console.log("Component Details: ", data)

  return (
    <Container px={false}>
      {isLoading && !data ? (
        <HintLoading text="Loading details..." />
      ) : (
        <>
          {data ? (
            <>
              <h1 className={DetailContentHeading}>
                <Icon className="mr-2" icon="widgets" /> {data.Name}
              </h1>

              <div className={DetailSection}>
                <div className={DetailSectionTop}>
                  <DataGrid gridColumnTemplate="1.5fr 8.5fr">
                    <DataGridRow>
                      <DataGridCell>
                        <b>ID: </b>
                      </DataGridCell>
                      <DataGridCell>{data.ID}</DataGridCell>
                    </DataGridRow>
                    <DataGridRow>
                      <DataGridCell>
                        <b>Owners: </b>
                      </DataGridCell>
                      <DataGridCell>{owners}</DataGridCell>
                    </DataGridRow>
                    <DataGridRow>
                      <DataGridCell>
                        <b>Operators: </b>
                      </DataGridCell>
                      <DataGridCell>{operators}</DataGridCell>
                    </DataGridRow>
                    <DataGridRow>
                      <DataGridCell>
                        <b>Type: </b>
                      </DataGridCell>
                      <DataGridCell>{data.Type}</DataGridCell>
                    </DataGridRow>
                  </DataGrid>
                </div>
                <div className={DetailSectionBottom}>
                  <DataGrid gridColumnTemplate="1.5fr 8.5fr">
                    {componentDetailsByType(data).map((item, index) => (
                      <DataGridRow key={index}>
                        <DataGridCell>
                          <b>{`${item.label}: `}</b>
                        </DataGridCell>
                        <DataGridCell>{item.value}</DataGridCell>
                      </DataGridRow>
                    ))}
                  </DataGrid>
                </div>
              </div>
              <div className={DetailSection}>
                <p className={DetailSectionHeader}>Vulnerabilities</p>
                <div className="mt-4">
                  <VulnerabilitiesList
                    vulnerabilities={data.Vulnerabilities}
                    sortBy="ThreatLevelOverall"
                    minimized
                  />
                </div>
              </div>

              <div className={DetailSection}>
                <p className={DetailSectionHeader}>Packages</p>
                <div className="mt-4">
                  <PackagesList packages={data.Packages} />
                </div>
              </div>
            </>
          ) : (
            <HintNotFound
              text={`No details found for component id ${componentId}`}
            />
          )}
        </>
      )}
    </Container>
  )
}

export default ComponentDetail
