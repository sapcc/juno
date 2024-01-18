import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useQueryClientFnReady } from "../StoreProvider"
import Pagination from "../../shared/Pagination"
import ServicesList from "./ServicesList"

const ServicesController = () => {
  const queryClientFnReady = useQueryClientFnReady()
  const [paginationParams, setPaginationParams] = useState({
    first: 10,
  })

  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: [`services`, { paginationParams }],
    enabled: !!queryClientFnReady,
  })

  const onPaginationChanged = (offset) => {
    console.log("ServicesController onPaginationChanged", offset)
    setPaginationParams({ ...paginationParams, after: `${offset}` })
  }

  return (
    <>
      <ServicesList services={data?.Services?.edges} isLoading={isLoading} />
      <Pagination
        count={data?.Services?.totalCount}
        limit={paginationParams?.first}
        onChanged={onPaginationChanged}
        isFetching={isFetching}
        disabled={isError}
      />
    </>
  )
}

export default ServicesController
