import React, { useCallback, useEffect } from "react"
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
import VulnerabilitiesList from "./VulnerabilitiesList"

const Header = `
font-bold
mt-4
text-lg
`

const ServiceDetail = () => {
  const { options, routeParams } = useRouter()

  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const serviceId = routeParams?.serviceId
  const placeholderData = options?.placeholderData
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

  const components = React.useMemo(() => {
    if (!data?.Components) return []
    return data.Components
  }, [data])

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
                  <DataGrid>
                    <DataGridRow className="relative">
                      <DataGridCell>
                        <Icon className="mr-2" icon="dns" /> {data.Name}
                      </DataGridCell>
                    </DataGridRow>
                  </DataGrid>
                  <p className={Header}>Vulnerabilities in this service</p>
                  <div className="mt-4">
                    <VulnerabilitiesList components={components} />
                  </div>
                  <p className={Header}>All components in this service</p>
                  <div className="mt-4">
                    <ComponentsList components={components} minimized />
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
