import React, { useCallback, useEffect, useState } from "react"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { Stack, Spinner } from "juno-ui-components"
import { getServices } from "../queries"
import { parseError } from "../helpers"
import Pagination from "./Pagination"
import ListToolBar from "./ListToolBar"
import ServicesList from "./ServicesList"

const ITEMS_PER_PAGE = 10

const Services = ({}) => {
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const [pagOffset, setPagOffset] = useState(0)
  const { isLoading, isError, data, error, isFetching } = getServices(
    endpoint,
    ITEMS_PER_PAGE,
    pagOffset
  )

  console.log("services DATA: ", data)

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (error) {
      setMessage({
        variant: "error",
        text: parseError(error),
      })
    }
  }, [error])

  const services = React.useMemo(() => {
    if (!data?.Results) return []
    return data.Results
  }, [data])

  const onPaginationChanged = (offset) => {
    console.log("offset: ", offset)
    if (pagOffset !== offset) {
      setPagOffset(offset)
    }
  }

  return (
    <>
      {isLoading && !data ? (
        <Stack className="mt-4" alignment="center">
          <Spinner variant="primary" />
          Loading services...
        </Stack>
      ) : (
        <>
          <ListToolBar disabled={isError} />
          <ServicesList services={services} />
          <Pagination
            count={data?.Count}
            limit={ITEMS_PER_PAGE}
            onChanged={onPaginationChanged}
            isFetching={isFetching}
            disabled={isError}
          />
        </>
      )}
    </>
  )
}

export default Services
