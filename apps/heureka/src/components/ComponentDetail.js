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
import { usersListToString } from "../helpers"

const Header = `
font-bold
mt-4
text-lg
`

const DetailSection = `
mt-6
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

              <div className={DetailSection}>
                <DataGrid gridColumnTemplate="1fr 9fr">
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
                </DataGrid>
              </div>

              <div className={DetailSection}>
                <p className={Header}>Vulnerabilities</p>
                <div className="mt-4">
                  {/* <VulnerabilitiesList vulnerabilities={} /> */}
                </div>
              </div>

              <div className={DetailSection}>
                <p className={Header}>Packages</p>
                <div className="mt-4">
                  {/* <VulnerabilitiesList vulnerabilities={} /> */}
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
