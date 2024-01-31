import React, { useEffect, useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useQueryClientFnReady } from "../StoreProvider"
import Pagination from "../shared/Pagination"
import ServicesList from "./ServicesList"
import { Messages, useActions as messageActions } from "messages-provider"
import Filters from "../filters/Filters"

const ServicesController = () => {
  const { addMessage, resetMessages } = messageActions()
  const queryClientFnReady = useQueryClientFnReady()
  const [queryOptions, setQueryOptions] = useState({
    first: 20,
  })

  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: [`services`, queryOptions],
    enabled: !!queryClientFnReady,
  })

  const services = useMemo(() => {
    if (!data) return []
    return data?.Services?.edges
  }, [data])

  useEffect(() => {
    if (!error) return
    addMessage({ variant: "danger", text: error?.message })
  }, [error])

  const onPaginationChanged = (offset) => {
    setQueryOptions({ ...queryOptions, after: `${offset}` })
  }

  return (
    <>
      <ServicesList services={services} isLoading={isLoading} />
      <Pagination
        count={data?.Services?.totalCount}
        limit={queryOptions?.first}
        onChanged={onPaginationChanged}
        isFetching={isFetching}
        disabled={isError || services.length === 0}
      />
    </>
  )
}

export default ServicesController
