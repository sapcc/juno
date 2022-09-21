import React, { useCallback, useEffect, useMemo } from "react"
import {
  Icon,
  DataGrid,
  DataGridRow,
  DataGridColumn,
  DataGridCell,
  Stack,
  Spinner,
  Container,
} from "juno-ui-components"
import { useRouter } from "url-state-router"
import { getUser } from "../queries"
import { useStore as useMessageStore } from "../messageStore"
import useStore from "../store"
import {
  DetailSection,
  DetailSectionBox,
  DetailContentHeading,
  DetailSectionHeader,
} from "../styles"
import LoadingHint from "./LoadingHint"
import ServicesList from "./ServicesList"
import { parseError } from "../helpers"

const UserDetail = ({}) => {
  const { routeParams } = useRouter()
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const userId = routeParams?.userId
  const { isLoading, isError, isFetching, data, error } = getUser(
    endpoint,
    userId
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

  console.log("User Details: ", data)

  return (
    <Container px={false}>
      {isLoading && !data ? (
        <LoadingHint text="Loading details..." />
      ) : (
        <>
          {!isError && (
            <>
              <h1 className={DetailContentHeading}>
                <Icon className="mr-2" icon="accountCircle" /> {data.Name}
              </h1>

              <div className={DetailSection}>
                <div className={DetailSectionBox}>
                  <DataGrid gridColumnTemplate="1fr 9fr">
                    <DataGridRow>
                      <DataGridCell>
                        <b>Email: </b>
                      </DataGridCell>
                      <DataGridCell>{data.Email}</DataGridCell>
                    </DataGridRow>
                    <DataGridRow>
                      <DataGridCell>
                        <b>ID: </b>
                      </DataGridCell>
                      <DataGridCell>{data.SapID}</DataGridCell>
                    </DataGridRow>
                  </DataGrid>
                </div>
              </div>
              <div className={DetailSection}>
                <p className={DetailSectionHeader}>Owned Services</p>
                <div className="mt-4">
                  <ServicesList services={data.OwnServices} />
                </div>
              </div>

              <div className={DetailSection}>
                <p className={DetailSectionHeader}>Evidences</p>
                <div className="mt-4"></div>
              </div>
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default UserDetail
