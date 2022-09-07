import React, { useCallback, useEffect, useMemo } from "react"
import {
  Icon,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Stack,
  Spinner,
  Container,
} from "juno-ui-components"
import { useRouter } from "url-state-router"
import { getComponent } from "../queries"
import { useStore as useMessageStore } from "../messageStore"
import useStore from "../store"
import { usersListToString, componentDetailsByType } from "../helpers"
import VulnerabilitiesList from "./VulnerabilitiesList"
import PackagesList from "./PackagesList"

const Header = `
font-bold
mt-4
text-lg
`

const Section = `
mt-6
`

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

const DetailContentHeading = `
juno-content-area-heading 
jn-font-bold
jn-text-lg
jn-text-theme-high
jn-pb-2
jn-pt-6
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
        <Stack alignment="center">
          <Spinner variant="primary" />
          Loading details...
        </Stack>
      ) : (
        <>
          {!isError && (
            <>
              <h1 className={DetailContentHeading}>
                <Icon className="mr-2" icon="widgets" /> {data.Name}
              </h1>

              <div className={Section}>
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
              <div className={Section}>
                <p className={Header}>Vulnerabilities</p>
                <div className="mt-4">
                  <VulnerabilitiesList vulnerabilities={data.Vulnerabilities} />
                </div>
              </div>

              <div className={Section}>
                <p className={Header}>Packages</p>
                <div className="mt-4">
                  <PackagesList packages={data.Packages} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default ComponentDetail
