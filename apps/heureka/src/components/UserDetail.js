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
import { getUser } from "../queries"
import { useStore as useMessageStore } from "../messageStore"
import useStore from "../hooks/useStore"
import {
  DetailSection,
  DetailSectionBox,
  DetailContentHeading,
  DetailSectionHeader,
} from "../styles"
import HintLoading from "./HintLoading"
import ServicesList from "./ServicesList"
import { parseError } from "../helpers"
import HintNotFound from "./HintNotFound"

const UserDetail = ({}) => {
  const { routeParams } = useRouter()
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const auth = useStore(useCallback((state) => state.auth))
  const setMessage = useMessageStore((state) => state.setMessage)
  const userId = routeParams?.userId
  const { isLoading, isError, isFetching, data, error } = getUser(
    auth?.id_token,
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

  return (
    <Container px={false}>
      {isLoading && !data ? (
        <HintLoading text="Loading details..." />
      ) : (
        <>
          {data ? (
            <>
              <h1 className={DetailContentHeading}>
                <Icon className="mr-2" icon="accountCircle" /> {data.Name}
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
                        <b>Email: </b>
                      </DataGridCell>
                      <DataGridCell>{data.Email}</DataGridCell>
                    </DataGridRow>
                    <DataGridRow>
                      <DataGridCell>
                        <b>SAP ID: </b>
                      </DataGridCell>
                      <DataGridCell>{data.SapID}</DataGridCell>
                    </DataGridRow>
                    <DataGridRow>
                      <DataGridCell>
                        <b>Support team: </b>
                      </DataGridCell>
                      <DataGridCell>Services team</DataGridCell>
                    </DataGridRow>
                  </DataGrid>
                </div>
              </div>
              <div className={DetailSection}>
                <p className={DetailSectionHeader}>Owned services</p>
                <div className="mt-4">
                  <ServicesList services={data.OwnServices} minimized />
                </div>
              </div>

              <div className={DetailSection}>
                <p className={DetailSectionHeader}>Evidences</p>
                <div className="mt-4"></div>
              </div>
            </>
          ) : (
            <HintNotFound text={`No details found for user id ${userId}`} />
          )}
        </>
      )}
    </Container>
  )
}

export default UserDetail
