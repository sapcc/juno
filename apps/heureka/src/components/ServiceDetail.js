import React, { useCallback, useEffect, useMemo } from "react"
import { getService } from "../queries"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { useRouter } from "url-state-router"
import { parseError, patchExampl1 } from "../helpers"
import {
  Icon,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Container,
} from "juno-ui-components"
import {
  DetailSection,
  DetailSectionBox,
  DetailContentHeading,
  DetailSectionHeader,
} from "../styles"
import HintLoading from "./HintLoading"
import HintNotFound from "./HintNotFound"
import PatchLogList from "./PatchLogList"
import ComponentsList from "./ComponentsList"

const listOfUsers = (users) => {
  users = users || []
  return users.map((user, index) => (
    <span key={index}>
      <span>{index ? ", " : ""}</span>
      {`${user.Name} `}
      <small className="text-sm pt-1 whitespace-nowrap text-theme-disabled">
        ({user.SapID})
      </small>
    </span>
  ))
}
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
    return listOfUsers(data.Owners)
  }, [data?.Owners])

  const operators = useMemo(() => {
    if (!data?.Operators) return []
    return listOfUsers(data.Operators)
  }, [data?.Operators])

  const components = useMemo(() => {
    if (!data?.Components) return []
    return data.Components
  }, [data])

  const patches = useMemo(() => {
    if (data?.Name && data?.Name === "Elektra") {
      return [patchExampl1]
    }
    return []
  }, [data])

  console.log("Service Details: ", data)

  return (
    <Container px={false}>
      {isLoading && !data ? (
        <HintLoading text="Loading details..." />
      ) : (
        <>
          {data ? (
            <>
              <h1 className={DetailContentHeading}>
                <Icon className="mr-2" icon="dns" /> {data.Name}
              </h1>

              <div className={DetailSection}>
                <div className={DetailSectionBox}>
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
              </div>

              <div className={DetailSection}>
                <p className={DetailSectionHeader}>
                  Vulnerabilities in this service
                </p>
                <div className="mt-4">
                  <ComponentsList minimized sorted components={components} />
                </div>
              </div>

              <div className={DetailSection}>
                <p className={DetailSectionHeader}>Patches log</p>
                <div className="mt-4">
                  <PatchLogList patches={patches} />
                </div>
              </div>
            </>
          ) : (
            <HintNotFound
              text={`No details found for service id ${serviceId}`}
            />
          )}
        </>
      )}
    </Container>
  )
}

export default ServiceDetail
