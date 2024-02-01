import React, { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  useQueryClientFnReady,
  useQueryOptions,
  useActions,
} from "../StoreProvider"
import VulnerabilitiesList from "./VulnerabilitiesList"

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

  return (
    <VulnerabilitiesList
      vulnerabilities={vulnerabilities}
      isLoading={isLoading}
    />
  )
}

export default VulnerabilitiesListController
