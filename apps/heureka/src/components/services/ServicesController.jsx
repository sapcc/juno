import React, { useEffect, useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useQueryClientFnReady } from "../StoreProvider"
import Pagination from "../shared/Pagination"
import ServicesList from "./ServicesList"
import { Messages, useActions as messageActions } from "messages-provider"

const ServicesController = () => {
  const { addMessage, resetMessages } = messageActions()
  const queryClientFnReady = useQueryClientFnReady()
  const [paginationParams, setPaginationParams] = useState({
    first: 10,
  })

  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: [`services`, { paginationParams }],
    enabled: !!queryClientFnReady,
  })

  const services = useMemo(() => {
    if (!data) return []
    return data?.Services?.edges
  }, [data])

  useEffect(() => {
    // on error reset messages
    if (!error) {
      return resetMessages()
    }
    addMessage({ variant: "danger", text: error?.message })
  }, [error])

  const onPaginationChanged = (offset) => {
    console.log("ServicesController onPaginationChanged", offset)
    setPaginationParams({ ...paginationParams, after: `${offset}` })
  }

  return (
    <>
      <ServicesList services={services} isLoading={isLoading} />
      <Pagination
        count={data?.Services?.totalCount}
        limit={paginationParams?.first}
        onChanged={onPaginationChanged}
        isFetching={isFetching}
        disabled={isError || services.length === 0}
      />
    </>
  )
}

export default ServicesController
