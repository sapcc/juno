import React, { useCallback, useEffect, useMemo } from "react"
import {
  Icon,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Container,
} from "juno-ui-components"
import { getVulnerability } from "../queries"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { useRouter } from "url-state-router"
import { parseError } from "../helpers"
import {
  DetailSection,
  DetailSectionBox,
  DetailContentHeading,
  DetailSectionHeader,
} from "../styles"
import HintLoading from "./HintLoading"
import HintNotFound from "./HintNotFound"

const VulnerabilitiyDetails = () => {
  const { options, routeParams } = useRouter()

  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const vulnerabilityId = routeParams?.vulnerabilityId
  const { isLoading, isError, isFetching, data, error } = getVulnerability(
    endpoint,
    vulnerabilityId
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

  console.log("Vulnerability Details: ", data)

  return (
    <Container px={false}>
      {isLoading && !data ? (
        <HintLoading text="Loading details..." />
      ) : (
        <>
          {data ? (
            <>
              <h1 className={DetailContentHeading}>
                <Icon className="mr-2" icon="autoAwesomeMotion" /> {data.ScnID}
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
                        <b>CveID: </b>
                      </DataGridCell>
                      <DataGridCell>{data.CveID}</DataGridCell>
                    </DataGridRow>
                  </DataGrid>
                </div>
              </div>
            </>
          ) : (
            <HintNotFound
              text={`No details found for vulnerability id ${vulnerabilityId}`}
            />
          )}
        </>
      )}
    </Container>
  )
}

export default VulnerabilitiyDetails
