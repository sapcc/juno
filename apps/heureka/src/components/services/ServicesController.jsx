import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useQueryClientFnReady } from "../StoreProvider"
import Pagination from "../../shared/Pagination"

const ServicesController = () => {
  const queryClientFnReady = useQueryClientFnReady()
  const [paginationParams, setPaginationParams] = useState({
    first: 10,
    // after: "", // id of the last item
  })

  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: [`services`, { paginationParams }],
    enabled: !!queryClientFnReady,
  })

  console.log("ServicesController data>>>>>>>>>>>>>>>>>>", data)

  const onPaginationChanged = (offset) => {
    console.log("ServicesController onPaginationChanged", offset)
    setPaginationParams({ ...paginationParams, after: `${offset}` })
  }

  return (
    <>
      <div>ServicesController</div>

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
