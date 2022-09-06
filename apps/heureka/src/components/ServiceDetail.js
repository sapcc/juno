import React, { useCallback, useEffect, useMemo } from "react"
import { getService } from "../queries"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { useRouter } from "url-state-router"
import {
  Icon,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Stack,
  Spinner,
  Container,
} from "juno-ui-components"
import ComponentsList from "./ComponentsList"
import ServiceVulnerabilitiesList from "./ServiceVulnerabilitiesList"
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

const ServiceDetail = () => {
  const { options, routeParams } = useRouter()

  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const serviceId = routeParams?.serviceId
  const { isLoading, isError, isFetching, data, error } = getService(
    endpoint,
    serviceId
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

  const components = useMemo(() => {
    if (!data?.Components) return []
    return data.Components
  }, [data])

  console.log("Service Details: ", data)

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
              {data ? (
                <>
                  <h1 className={DetailContentHeading}>
                    <Icon className="mr-2" icon="dns" /> {data.Name}
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
                    <p className={Header}>Vulnerabilities in this service</p>
                    <div className="mt-4">
                      <ServiceVulnerabilitiesList components={components} />
                    </div>
                  </div>
                </>
              ) : (
                <Stack
                  alignment="center"
                  distribution="center"
                  direction="vertical"
                  className="h-full"
                >
                  <p>{`No details found for service id ${serviceId}`}</p>
                </Stack>
              )}
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default ServiceDetail
