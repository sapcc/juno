import React, { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  useQueryClientFnReady,
  useQueryOptions,
  useActions,
} from "../StoreProvider"
import VulnerabilitiesList from "./VulnerabilitiesList"
import PaginationV2 from "../shared/PaginationV2"

const VulnerabilitiesListController = () => {
  const queryClientFnReady = useQueryClientFnReady()
  const queryOptions = useQueryOptions("vulnerabilities")
  const { setQueryOptions } = useActions()

  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: [`vulnerabilities`, queryOptions],
    enabled: !!queryClientFnReady,
  })

  const vulnerabilities = useMemo(() => {
    if (!data) return null
    return data?.VulnerabilityMatches?.edges
  }, [data])

  const pageInfo = useMemo(() => {
    if (!data) return null
    return data?.VulnerabilityMatches?.pageInfo
  }, [data])

  console.log("VulnerabilitiesListController::: pageInfo: ", pageInfo)

  return (
    <>
      <VulnerabilitiesList
        vulnerabilities={vulnerabilities}
        isLoading={isLoading}
      />
      <PaginationV2
        pagesInfo={pageInfo}
        isFetching={isFetching}
        isLoading={isLoading}
        disabled={isError || !vulnerabilities || vulnerabilities?.length === 0}
      />
    </>
  )
}

export default VulnerabilitiesListController
